document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('editForm');
    const itemId = new URLSearchParams(window.location.search).get('id');

    async function fetchItem() {
        try {
            const response = await fetch(`https://adresadquisitionapi20240629195845.azurewebsites.net/api/Acquisition/${itemId}`, {
                headers: {
                    'Origin': window.location.origin
                }
            });
            const item = await response.json();
            populateForm(item);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function populateForm(item) {
        document.getElementById('itemId').value = item.id;
        document.getElementById('editPresupuesto').value = item.presupuesto;
        document.getElementById('editUnidad').value = item.unidad;
        document.getElementById('editTipoBien').value = item.tipoBien;
        document.getElementById('editCantidad').value = item.cantidad;
        document.getElementById('editValorUnitario').value = item.valorUnitario;
        document.getElementById('editValorTotal').value = item.valorTotal;
        document.getElementById('editFechaAdquisicion').value = formatDate(item.fechaAdquisicion);
        document.getElementById('editProveedor').value = item.proveedor;
        document.getElementById('editDocumentacion').value = item.documentacion;
    }

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const editedItem = {
            presupuesto: document.getElementById('editPresupuesto').value,
            unidad: document.getElementById('editUnidad').value,
            tipoBien: document.getElementById('editTipoBien').value,
            cantidad: document.getElementById('editCantidad').value,
            valorUnitario: document.getElementById('editValorUnitario').value,
            valorTotal: document.getElementById('editValorTotal').value,
            fechaAdquisicion: document.getElementById('editFechaAdquisicion').value,
            proveedor: document.getElementById('editProveedor').value,
            documentacion: document.getElementById('editDocumentacion').value,
        };

        try {
            const response = await fetch(`https://adresadquisitionapi20240629195845.azurewebsites.net/api/Acquisition/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                },
                body: JSON.stringify(editedItem),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Ok!",
                    text: "Actualizado!",
                    icon: "success"
                  });

                  setTimeout(function(){
                    window.location.href = 'list.html';
                }, 3000);

                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Fallo algo al actualizar!",
                  });
                  setTimeout(function(){
                    window.location.href = 'list.html';
                }, 5000);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    fetchItem();
});

function formatDate(dateString) {
    return dateString.substring(0, 10);
}
