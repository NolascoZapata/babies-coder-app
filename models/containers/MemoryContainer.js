const { v4 : uuid } = require('uuid');
const { logger } = require('../../log/logger');


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
            logger.log('error',`${this.resource} with id ${id} does not exists in our records`)
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
            logger.log('error',`${this.resource} with id ${id} does not exists in our records`)
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
            logger.log('error',`${this.resource} with id ${id} does not exists in our records`)
        }
        return this.items.splice(index,1)
    }

    deleteAll(){
        this.items = []
    }

}   

module.exports = MemoryContainer