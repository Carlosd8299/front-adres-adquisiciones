document.addEventListener('DOMContentLoaded', () => {
    const logList = document.getElementById('logList');
    const dateForm = document.getElementById('dateForm');
    const logDate = document.getElementById('logDate');

    dateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectedDate = logDate.value;

        if (selectedDate) {
            const formattedDate = selectedDate;
            await fetchLogs(formattedDate);
        }
    });

    async function fetchLogs(date) {
        try {
            const response = await fetch(`https://adresadquisitionapi20240629195845.azurewebsites.net/api/Log/${date}`, {
                headers: {
                    'Origin': window.location.origin
                }
            });
            const logs = await response.json();
            displayLogs(logs);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayLogs(logs) {
        logList.innerHTML = ''; // Clear existing logs
        logs.forEach(log => {
            const tr = document.createElement('tr');
            tr.className = 'border-t';
            tr.innerHTML = `
                <td class="px-4 py-2">${log.date}</td>
                <td class="px-4 py-2">${log.message}</td>
                <td class="px-4 py-2">${log.user}</td>
                <td class="px-4 py-2">${log.event}</td>
            `;
            logList.appendChild(tr);
        });
    }
});
