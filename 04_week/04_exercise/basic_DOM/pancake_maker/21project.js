const apiKey = 'YOUR_API_KEY';  // Replace with your Trello API Key
const token = 'YOUR_API_TOKEN'; // Replace with your Trello Token
const boardId = 'YOUR_BOARD_ID'; // Replace with your Trello Board ID

// Trello API base URL
const baseURL = 'https://api.trello.com/1';

// Helper function to make GET requests
async function trelloGet(url) {
    const fullUrl = `${url}?key=${apiKey}&token=${token}`;
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data;
}

// Helper function to make PUT requests
async function trelloPut(url, body) {
    const fullUrl = `${url}?key=${apiKey}&token=${token}`;
    const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

// Helper function to make POST requests
async function trelloPost(url, body) {
    const fullUrl = `${url}?key=${apiKey}&token=${token}`;
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

// Step 1: Retrieve the Backlog list and its cards
async function getBacklogListAndCards() {
    const listsUrl = `${baseURL}/boards/${boardId}/lists`;
    const lists = await trelloGet(listsUrl);

    const backlogList = lists.find(list => list.name === 'Backlog');
    if (backlogList) {
        const cardsUrl = `${baseURL}/lists/${backlogList.id}/cards`;
        const cards = await trelloGet(cardsUrl);
        return { listId: backlogList.id, cards };
    } else {
        throw new Error('Backlog list not found.');
    }
}

// Step 2: Update each card in the Backlog with details
async function updateBacklogCards(cards) {
    const tasks = [
        {
            title: 'Design the Homepage',
            label: 'Design',
            userStory: 'As a visitor, I want to quickly find important information so that I can learn more about the portfolio owner.',
            subtasks: ['Create a navigation bar', 'Add a header with an introduction', 'Ensure the design works on both mobile and desktop']
        },
        {
            title: 'Write Bio',
            label: 'Content',
            userStory: 'As a potential employer, I want to read a brief bio so that I can understand the candidate’s background.',
            subtasks: ['Write a short bio', 'Proofread and edit for clarity', 'Add bio to the homepage']
        },
        {
            title: 'Create Contact Form',
            label: 'Functionality',
            userStory: 'As a visitor, I want to easily contact the portfolio owner so that I can inquire about their work or opportunities.',
            subtasks: ['Create form structure', 'Add input fields for name, email, and message', 'Implement form validation', 'Add submit button']
        },
        {
            title: 'Optimize Images',
            label: 'Functionality',
            userStory: 'As a visitor, I want the site to load quickly so that I can have a smooth browsing experience.',
            subtasks: ['Compress all images', 'Use responsive image formats', 'Test load time on various devices']
        }
    ];

    // Loop through the tasks and update each card accordingly
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const card = cards.find(card => card.name === task.title);

        if (card) {
            // Add user story as description
            const cardUrl = `${baseURL}/cards/${card.id}`;
            await trelloPut(cardUrl, { desc: task.userStory });

            // Add the label
            const labelsUrl = `${baseURL}/cards/${card.id}/labels`;
            await trelloPost(labelsUrl, { color: getLabelColor(task.label), name: task.label });

            // Add subtasks as a checklist
            const checklistUrl = `${baseURL}/cards/${card.id}/checklists`;
            const checklist = await trelloPost(checklistUrl, { name: 'Subtasks' });
            const checklistId = checklist.id;

            // Add each subtask
            for (const subtask of task.subtasks) {
                const checklistItemUrl = `${baseURL}/checklists/${checklistId}/checkItems`;
                await trelloPost(checklistItemUrl, { name: subtask });
            }
        }
    }

    console.log('Backlog cards updated successfully!');
}

// Helper function to get label color based on the category
function getLabelColor(label) {
    const labelColors = {
        'Design': 'green',
        'Content': 'blue',
        'Functionality': 'red'
    };
    return labelColors[label] || 'yellow'; // Default color
}

// Main function to run the entire process
async function updateTrelloBacklog() {
    try {
        const { listId, cards } = await getBacklogListAndCards();
        await updateBacklogCards(cards);
    } catch (error) {
        console.error('Error updating backlog:', error);
    }
}

// Run the update process
updateTrelloBacklog();
