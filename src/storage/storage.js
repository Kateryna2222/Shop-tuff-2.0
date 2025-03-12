export const storage = {
    setItem: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data))
    },
    getItem: (name) => {
        const item = localStorage.getItem(name);

        if(item){
            return JSON.parse(item)
        }
    },
    removeItem: (name) => {
        const item = localStorage.getItem(name);

        if(item){
            return localStorage.removeItem(name)
        }
    }
}

