document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');

    itemForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newItem = {
            presupuesto: document.getElementById('presupuesto').value,
            unidad: document.getElementById('unidad').value,
            tipoBien: document.getElementById('tipoBien').value,
            cantidad: document.getElementById('cantidad').value,
            valorUnitario: document.getElementById('valorUnitario').value,
            fechaAdquisicion: document.getElementById('fechaAdquisicion').value,
            proveedor: document.getElementById('proveedor').value,
            documentacion: document.getElementById('documentacion').value,
        };

        try {
            const response = await fetch('https://adresadquisitionapi20240629195845.azurewebsites.net/api/Acquisition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Ok!",
                    text: "Guardado!",
                    icon: "success"
                  });

                  setTimeout(function(){
                    window.location.href = 'list.html';
                }, 5000);
                  
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al guardar!",
                  });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
