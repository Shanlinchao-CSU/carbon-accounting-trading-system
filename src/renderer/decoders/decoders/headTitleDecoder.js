import TitleDecoder from "./titleDecoder";

class HeadTitleDecoder extends TitleDecoder{
    constructor(text){
        text = "= " + text + " =";
        super(text);
    }
}

export default HeadTitleDecoder;