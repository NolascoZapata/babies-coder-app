const { v4 : uuid } = require('uuid')


class MemoryContainer {
    constructor(resource){
        this.items = [];
        this.resource = resource
    }

    getAll(){
        return [...this.items]
    }
    getById(id){
        const item = this.item.find(it=>it.id===id)
        if (!item) {
            throw new Error (`${this.resource} con id ${id} no existe en nuestros registros`)
        }
        return item
    }

    save(item){
        const newItem ={
            id:uuid(),
            ...item,
            createdAt : Date.now().toLocaleString(),
            updatedAt : Date.now().toLocaleString()

        }
        this.items.push(newItem)
        return newItem
    }

    update(id,item){
        const index = this.items.findIndex(it=>it.id===+id)
        if (index<0) {
            throw new Error (`${this.resource} con id ${id} no existe en nuestros registros`)
        }

        const updatedItem ={
            id,
            ...item,
            updatedAt: Date.now().toLocaleString()
        }
        this.items[index]= updatedItem
        return updatedItem

    }

    deleteById(id){
        const index = this.items.findIndex(it=>it.id===+id)
        if (index<0) {
            throw new Error (`${this.resource} con id ${id} no existe en nuestros registros`)
        }
        return this.items.splice(index,1)
    }

    deleteAll(){
        this.items = []
    }

}   

module.exports = MemoryContainer