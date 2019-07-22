// mind mapping 引擎文件
import UUID from './uuid.js';
class sprite { // h 60 w 200
    constructor(dom, data, superior, editor ) {
        
        this.dom      = dom;
        this.superior = superior; // 父级信息
        this.editor   = editor;   // 全局信息
        
        this.data     = data;
        this.x        = data.x;
        this.y        = data.y;
        this.id       = data.id;
        this.maxY     = data.maxY,
        this.minY     = data.minY,
        this.index    = data.index;
        this.color    = data.color;
        this.group    = dom.group().move(this.x, this.y);
        
        this.sprites  = [];
        this.width    = 0;
        this.height   = 0;

        this.font  = {
            size   : data.size,
            weight : 'bold',
        };

        this.title = {
            tit   : data.title,
            rect  : '',
            text  : '',
        }
        
        this.maskBG     = this.group.rect(0, 0).fill(this.color).move(-2, -2).radius(10);
        this.title.rect = this.group.rect(0, 0).fill(this.color).radius(10);
        this.title.text = this.group.text('').font(this.font).fill('#fff');
        this.mask       = this.group.rect(0, 0).fill('transparent').move(0, 0).attr({ 'cursor' : 'pointer'});

        this.addBtn     = this.group.group().attr({ 'cursor' : 'pointer'});        // 添加
        this.addBtnC    = this.addBtn.circle(15).fill('#d1d3d5');                  // 添加
        this.addBtn.text('+').font({size   : 15,}).fill('#fff').move(3, -3);       // 添加
        this.addBtnMask = this.addBtn.rect(15, 15).fill('transparent').move(0, 0); // 添加

        let dblclickFS  = (e)=>{
            console.log(e);
            },
            mouseoverFS = (e) => {
                this.maskBG.animate(200).attr({
                    fill: '#bcbec0', 
                    'fill-opacity': 1, 
                });
                this.title.rect.animate(200).fill('#fff')
                this.title.text.animate(200).fill('#474261');
            },
            mouseoutFS  = (e) => {
                this.maskBG.animate(200).attr({
                    fill: this.color, 
                    'fill-opacity': 1, 
                });
                this.title.rect.animate(200).fill(this.color)
                this.title.text.animate(200).fill('#fff');
            };
        this.mask.dblclick(dblclickFS)
        this.mask.mouseover(mouseoverFS);
        this.mask.mouseout(mouseoutFS);
        
        let addMouseover = (e)=>{
                this.addBtnC.animate(200).attr({
                    fill: this.color, 
                    'fill-opacity': 1, 
                });
            },
            addMouseout  = (e)=>{
            
                this.addBtnC.animate(200).attr({
                    fill: '#d1d3d5', 
                    'fill-opacity': 1, 
                });
            },
            addClick     = (e)=>{
                this.addSprite();
            };
        this.addBtnMask.mouseover(addMouseover);
        this.addBtnMask.mouseout(addMouseout);
        this.addBtnMask.click(addClick);

        if(this.index > 0){
            
            this.pathLine   =  this.group.path().fill('transparent').attr({
                stroke: this.color, 
                'stroke-width' : 4,
                'marker-start' : 'url(#'+ this.editor.arrowEnd.id() +')',
                'marker-end'   : 'url(#'+ this.editor.arrowStart.id() +')',
            });
            
            this.removeBtn     = this.group.group().attr({ 'cursor' : 'pointer'});        // 添加
            this.removeBtnC    = this.removeBtn.circle(15).fill('#d1d3d5');                  // 添加
            this.removeBtn.text('-').font({size   : 20,}).fill('#fff').move(4, -5);       // 添加
            this.removeBtnMask = this.removeBtn.rect(15, 15).fill('transparent').move(0, 0); // 添加
            
            let removeMouseover = (e)=>{
                this.removeBtnC.animate(200).attr({
                    fill: this.color, 
                    'fill-opacity': 1, 
                });
                },
                removeMouseout  = (e)=>{
                
                    this.removeBtnC.animate(200).attr({
                        fill: '#d1d3d5', 
                        'fill-opacity': 1, 
                    });
                },
                removeClick     = (e)=>{
                    let sptireData = '';

                    for(let i = 0; i < this.superior.sprites.length; i++){
                        
                        let sprite = this.superior.sprites[i];
                            
                        if(this.id == sprite.id){
                            sptireData = i == 0 ? 
                                            this.superior.sprites[1] 
                                        : 
                                            (
                                                i == (this.superior.sprites.length - 1) ? 
                                                        this.superior.sprites[this.superior.sprites.length - 2]
                                                    :
                                                this.superior.sprites[i + 1]
                                            );

                            sprite.group.remove();
                            this.superior.sprites.splice(i, 1);  
                            this.settingSVGSize();
                            break;
                        }
                    }
                    this.superior.spritesPosition(sptireData);
                };
            this.removeBtnMask.mouseover(removeMouseover);
            this.removeBtnMask.mouseout(removeMouseout);
            this.removeBtnMask.click(removeClick);
        }



        this.changeTitle(this.title.tit);
    }
    
    changeTitle(title){     // 改变标题

        let tit = title.length > 7 ? (title.slice(0, 7) + '...') : title;
        this.title.tit = title;
        this.title.text.text(tit);
        this.autoPosition();        
    }
    
    autoPosition(){         // 自动计算定位

        let {width, height} = this.title.text.bbox();
       
        this.title.rect.attr({
            width  : width + 10, 
            height : height + 10,
        });
        this.maskBG.attr({
            width  : width + 14, 
            height : height + 14,
        });
        this.mask.attr({
            width  : width + 10, 
            height : height + 10,
        });
        this.title.rect.move(0, 0);
        this.title.text.move(5, 5);
        this.group.move(this.x, this.y - (height/2));
        
        if(this.index > 0){

            this.pathLine.attr({ d : this.getSuperiorLine(height)});
            
            this.addBtn.move(width + 4 + 15, (height + 14)/2 - 20);
            this.removeBtn.move(width + 4 + 15, (height + 14)/2 + 5);
        }else{

            this.addBtn.move(width + 4 + 15, (height + 14)/2 - 8);
        }
        this.width    = width  + 45;
        this.height   = height + 10;
        
        this.settingSVGSize();

    }

    getSuperiorLine(height){
        let end = {
            x : -20,
            y :  Math.round(( (height + 14) / 2 )),
        },
            start = {
                x : -this.editor.spacing,
                y :  Math.round(-(this.y - (height + 11))),
        };
           
            
        let judgeY = start.y - end.y;
        let startLineC = '';
        if(judgeY < 5 && judgeY > -5 ){
            
            end.y = start.y;
            startLineC = ' L ' + end.x + ',' + start.y;
        }else{
            startLineC = 'C ' + (start.x) + ',' + (end.y) 
                                    + ' ' + 
                                (start.x + 30) + ',' + (end.y) 
                                    + ' ' + 
                                (end.x) + ',' + (end.y);
                                // 'S '+ end.x - 20 + ' ' + end.y + end.x + ',' + end.y;
        }

        let line = 'M ' + start.x + ',' + start.y + startLineC ;
        return line;
    }

    movePosition(data){
        this.x      = data.x || this.x;
        this.y      = data.y || this.y;
        this.autoPosition();
    }

    spritesPosition(data){ // 删除没有写完
        let posSprite = (data)=>{

            this.editor.getSpriteY(data, 0);
            if(data.superior && data.superior.sprites){
                posSprite(data.superior)
            }
        }
        posSprite(data)
    }

    addSprite(e){
        let spriteX = this.width + this.editor.spacing,
            spriteY = this.editor.getSpriteY(this, 1),
            bboxData= this.getSpriteHeight();

        let color = this.color;
        if(this.index == 0){
            color = this.superior.colorList[ this.sprites.length % 5 ];
        }

        let size = this.font.size * 0.8;
        size = Math.round(size);
        size = size > 14 ? size : 14;

        spriteY.spriteY = spriteY.spriteY - 5;
        this.editor.addSprite({
            x     : spriteX,
            y     : spriteY.spriteY,
            index : this.index,
            dom   : this.group,
            id    : this.id + '___' + this.sprites.length,
            color : color,
            minY  : this.minY,
            maxY  : this.maxY,
            data  : this,
            size  : size,
        }).then(item => {
            this.sprites.push(item);
            this.spritesPosition(item);
        });
    }

    settingSVGSize(){
        
        if(this.editor.title){
            this.editor.settingSVGSize();
        }
    }

    getSpriteHeight(){
        let height = 0;
        if(this.sprites.length > 1){
            height = this.sprites[0].group.bbox().height + this.sprites[this.sprites.length - 1].group.bbox().height;
        }
        return height;
    }
    
    removeHeightFS(id,height){

        let idArray = id.split('___'),
            spritesLength = this.editor.title.sprites,
            lastSprites   = spritesLength[spritesLength.length -1];

        if(idArray[1] == 0 || idArray[1] == (spritesLength.length -1) ){
            
            for(let i = 1; i < idArray.length; i++){
                let index = idArray[i];
                
                if(index == 0 || index == (lastSprites.sprites.length - 1)){
                    height = height/2; 
                }
            }
        }
        return height;
    }
};


export default class {
    constructor(svg, data) {
        this.SVG  = svg;
        this.data = data;
        this.dom  = this.SVG(data.domId);

        this.width     = data.width;
        this.height    = data.height;
        this.oldWidth  = data.width;
        this.oldHeight = data.height;

        this.spacing= data.spacing || 50;
        this.dom.size(this.width, this.height);

        this.iconDom    = this.dom.defs()
        this.arrowStart = this.iconDom.marker(6, 6, (add) => {
            add.attr({ orient : "auto" })
            add.path("M1,1 L5,3 L1,5 L3,3 L1,1").fill('red');
        }); 
        this.arrowEnd   = this.iconDom.marker(3, 3, (add) => {
            add.circle(3).fill('#f06');
        }); 

        this.colorList = [
            '#414042',
            '#0043A4',
            '#004156',
            '#008736',
            '#D2AA1B',
        ];
        this.UUID  = new UUID();
        this.title = new sprite(
            this.dom, 
            {
                title : '创建标题',
                index : 0,
                x     : 5,
                y     : this.height/2,
                color : '#ff2970',
                id    : this.UUID.generate(),
                minY  : 0,
                maxY  : this.height,
                size  : data.size || 40,
            },
            this,
            this,
        );
        
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
    
    fromJson() {

    }

    addSprite(data){

        let item = new sprite(
            data.dom, 
            {
                title : '创建标题',
                index : data.index + 1,
                x     : data.x,
                y     : data.y,
                color : data.color,
                id    : data.id,
                minY  : data.minY,
                maxY  : data.maxY,
                size  : data.size || 14,
            },
            data.data,
            this,
        );
        return Promise.resolve(item);
    }

    settingSVGSize(){

        let bbox = this.title.group.bbox()
            let {width, height} = bbox;
            width  = Math.round( width + 10);
            height = Math.round( height + 10);
            
            width  = this.oldWidth  >= width  ? this.oldWidth  : width;
            height = this.oldHeight >= height ? this.oldHeight : height;
        if(width  != this.width || height != this.height){

            this.width  = width;
            this.height = height;
            let titleY = this.oldHeight >= height ? 
                    (this.height/2) 
                : 
                    (-bbox.y + (this.title.height / 2));
            this.dom.size(this.width, this.height);
            this.title.movePosition({ y : titleY});
        }

    }
    
    getSelectSprite(id){
        let spriteData = [];
        let spriteDataFS = (data) => {
            
            
            for(let i = 0; i < data.length; i++){
                let sprite = data[i];
                
                if(id == sprite.id){
                    spriteData = Object.assign({}, sprite);
                    return spriteData;
                }

                if(sprite.sprites.length){
                    spriteDataFS(sprite.sprites);
                }
            }
        };
        
        spriteDataFS(this.title.sprites);
        return spriteData;                    
    }

    getSpriteY(data, num){
        if(data){

            let spriteY       =  data.height / 2;
            let spritesLength = data.sprites.length;
            let spriteHeight  = 0;

            if(spritesLength){
                let heightSprite = data.sprites[0].height;
                let allHeight = ( spritesLength + num ),
                    addHeight = 0;
                    allHeight = (allHeight * (heightSprite * 2));
                
                for(let i = 0; i < spritesLength; i++){

                    let sprite = data.sprites[i];
                    let addH   = (sprite.getSpriteHeight() ? (sprite.getSpriteHeight() - (sprite.height - 20)) : 0);
                    // if(i = 0 || i == (spritesLength - 1)){
                    //     addH = addH/2;
                    // }
                    addHeight += addH;

                }

                let top       = -((allHeight + addHeight) / 2) + (heightSprite / 2) + heightSprite;
                console.log(top, heightSprite,  allHeight, heightSprite)
                
                for(let i = 0; i < spritesLength; i++){

                    let sprite = data.sprites[i];
                    let y = top + ( (heightSprite * 2) * i ); // 5是背景遮照的多余距离
                    
                    if(i > 0){

                        if(data.sprites[i - 1]){

                            y =  data.sprites[i - 1].y + (
                                    (
                                        data.sprites[i - 1].getSpriteHeight() ? 
                                            ((data.sprites[i - 1].getSpriteHeight() / 2) + (data.sprites[i - 1].height / 2 + data.sprites[i - 1].height)) 
                                        : 
                                            ((data.sprites[i - 1].height) * 2)
                                    )
                                );
                        }
                    }
                    if(sprite.getSpriteHeight()){
                        y += ((sprite.getSpriteHeight() / 2) - 20);
                    }
                    sprite.movePosition({y : y})
                }
                let h = data.sprites[ data.sprites.length - 1 ].y
                            +
                        (data.sprites[ data.sprites.length - 1 ].getSpriteHeight() / 2);

                spriteHeight = (data.sprites[ data.sprites.length - 1 ].getSpriteHeight() / 2);
                               
                spriteY = (heightSprite / 2) + h + (heightSprite * 2) -20;
                // spriteY = allHeight/2 - (heightSprite / 2) + (addHeight);
            }
            return {
                spriteY, 
            };
        }
    }
}