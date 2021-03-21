document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const description = document.querySelector('input[type="text"]').value;
        const file = document.querySelectorAll('input[type="file"]')[0].files[0];
        if (!file) return;
        console.log(file);

        const formData = new FormData();
        formData.append('description', description);
        formData.append('file', file);

        fetch('/image-form', {
            method: 'POST',
            body: formData
        }).catch(console.error);
    });

    upload.addEventListener('click', (ev) => {
        const file = document.querySelectorAll('input[type="file"]')[1].files[0];
        if (!file) return;
        console.log(file);
        // const reader = new FileReader();
        // reader.addEventListener('load', ({ target: { result } }) => {
        //     fetch('/image', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'image/png' },
        //         body: result // ev.target.result
        //     }).catch(console.error);
        // });
        // reader.readAsBinaryString(file);
        // reader.readAsArrayBuffer(file);

        // file.arrayBuffer().then(x => {

        // works, but the payload does not show in devtools
        fetch('/image', {
            method: 'POST',
            body: file
        }).catch(console.error);

        // });
    });

    download.addEventListener('click', (ev) => {
        const id = prompt("ID: ");
        if (!id.match(/^[1-9][0-9]*$/)) return;
        console.log(id);
        fetch(`/image/${id}`)
            .then((res) => res.blob())
            .then((res) => {
                preview.src = URL.createObjectURL(res);
            })
            .catch(console.error);
    });
});
