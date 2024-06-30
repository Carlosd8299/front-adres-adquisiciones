document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.getElementById('itemList');

    async function fetchItems() {
        try {
            const response = await fetch('https://adresadquisitionapi20240629195845.azurewebsites.net/api/Acquisition', {
                headers: {
                    'Origin': window.location.origin
                }
            });
            const items = await response.json();
            items.forEach(addItemToDOM);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function addItemToDOM(item) {
        const tr = document.createElement('tr');
        tr.className = 'border-t';
        tr.innerHTML = `
            <td class="px-4 py-2">${item.presupuesto}</td>
            <td class="px-4 py-2">${item.unidad}</td>
            <td class="px-4 py-2">${item.tipoBien}</td>
            <td class="px-4 py-2">${item.cantidad}</td>
            <td class="px-4 py-2">${item.valorUnitario}</td>
            <td class="px-4 py-2">${item.valorTotal}</td>
            <td class="px-4 py-2">${item.fechaAdquisicion}</td>
            <td class="px-4 py-2">${item.proveedor}</td>
            <td class="px-4 py-2">${item.documentacion}</td>
            <td class="px-4 py-2">
                <button class="bg-blue-400 text-white px-2 py-1 rounded mr-2" onclick="editItem(${item.id})">Editar</button>
                <button class="bg-red-400 text-white px-2 py-1 rounded" onclick="deleteItem(${item.id})">Desactivar</button>
            </td>
        `;
        itemList.appendChild(tr);
    }

    window.editItem = function(id) {
        window.location.href = `edit.html?id=${id}`;
    };

    window.deleteItem = async function(id) {
        try {
            const response = await fetch(`https://adresadquisitionapi20240629195845.azurewebsites.net/api/Acquisition/${id}`, {
                method: 'DELETE',
                headers: {
                    'Origin': window.location.origin
                }
            });

            if (response.ok) {
             
                Swal.fire({
                    title: "Ok!",
                    text: "Borrado!",
                    icon: "success"
                  });

                  setTimeout(function(){
                    location.reload();
                }, 5000);
                  
                //fetchItems(); // Refresh the list after deletion
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Fallo algo al borrar!",
                  });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchItems();
});
