const ViewQuery = require('../src/queries/viewQuery');

async function runExamples() {
    try {
        // Example 1: Query a specific view
        console.log('Example 1: Querying specific view');
        const viewData = await ViewQuery.queryView('Qmbxa3sgEtz4CqVQKpe9xZ9dNZZxuLnptQhUesmVfzrCKR');
        console.log('View data:', JSON.stringify(viewData, null, 2));

    } catch (error) {
        console.error('Example error:', error);
    }
}

runExamples();
