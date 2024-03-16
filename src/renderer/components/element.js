class Element{
    constructor(parent_node, type, show){
        this.element = document.createElement(type);
        this.type = type;
        this.parent_node = parent_node;
        if(show){
            this.parent_node.appendChild(this.element);
        }
    }
    append(){
        this.parent_node.appendChild(this.element);
    }
    remove(){
        try{
            this.parent_node.removeChild(this.element);
        }catch{
            // console.log("remove错误");
        }
    }
}

export default Element;