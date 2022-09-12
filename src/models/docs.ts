const docsModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8976" :
        "https://jsramverk-editor-jofr21.azurewebsites.net",

    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${docsModel.baseUrl}/docs`);

        const docs = await response.json();

        return docs.data;
    },
    createDoc: async function createDoc(newDoc: any) {
        const response = await fetch(`${docsModel.baseUrl}/docs`, {
            body: JSON.stringify(newDoc),
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        });

        const result = await response.json();

        console.log(result);
    },
    updateDoc: async function updateDoc(doc: any) {
        const response = await fetch(`${docsModel.baseUrl}/docs`, {
            body: JSON.stringify(doc),
            headers: {
                "content-type": "application/json"
            },
            method: "PUT"
        });

        const result = await response.json();

        console.log(result);
    },
    deleteDoc: async function deleteDoc(docId: any) {
        const response = await fetch(`${docsModel.baseUrl}/docs`, {
            body: JSON.stringify(docId),
            headers: {
                "content-type": "application/json"
            },
            method: "DELETE"
        });

        const result = await response.json();

        console.log(result);
    }
};

export default docsModel;