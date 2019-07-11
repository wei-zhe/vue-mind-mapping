// mind mapping 引擎文件
import UUID from './uuid.js';
class sprite { // h 60 w 200
    constructor(dom, data, superior, editor ) {
        
        this.dom      = dom;
        this.group    = dom.group().move(data.x, data.y);
        this.superior = superior; // 父级信息
        this.editor   = editor;   // 全局信息
        this.data     = data;
        this.index    = data.index;
        this.minY     = data.minY,
        this.maxY     = data.maxY,
        this.color    = data.color;
        
        this.sprites  = [];
        this.width    = 0;
        this.height   = 0;
        this.id       = data.id;

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
            
            this.pathLine   =  this.group.path().attr({
                stroke: this.color, 
                'stroke-width' : 4,
                'marker-start' : 'url(#'+ this.editor.arrowEnd.id() +')',
                'marker-end'   : 'url(#'+ this.editor.arrowStart.id() +')',
            });
            
            this.removeBtn     = this.group.group().attr({ 'cursor' : 'pointer'});        // 添加
            this.removeBtnC    = this.removeBtn.circle(15).fill('#d1d3d5');                  // 添加
            this.removeBtn.text('x').font({size   : 15,}).fill('#fff').move(4, -3);       // 添加
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
                for(let i = 0; i < this.superior.sprites.length; i++){
                    
                    let sprite = this.superior.sprites[i];
                    
                    if(this.id == sprite.id){
                        
                        sprite.group.remove();
                        this.superior.sprites.splice(i, 1);  
                        this.settingSVGSize();
                        break;
                    }
                }
                this.superior.spritesPosition();
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
        this.group.move(this.data.x, this.data.y - (height/2));
        
        if(this.index > 0){

            this.pathLine.attr({ d : this.getSuperiorLine(height)});
            
            this.addBtn.move(width + 4 + 15, (height + 14)/2 - 20);
            this.removeBtn.move(width + 4 + 15, (height + 14)/2 + 5);
        }else{

            this.addBtn.move(width + 4 + 15, (height + 14)/2 - 8);
        }
        this.width    = width + 45;
        this.height   = height;
        
        this.settingSVGSize();

    }

    getSuperiorLine(height){
        let end = {
            x : -20,
            y :  Math.round(( (height + 14) / 2 )),
        },
            start = {
                x : -this.editor.spacing,
                y :  Math.round(-(this.data.y - (height + 11))),
        };
           
            
        let judgeY = start.y - end.y;
        if(judgeY < 5 && judgeY > -5 ){
            
            end.y = start.y;
        }
            
        let line = 'M ' + start.x + ',' + start.y + ' L ' + end.x + ',' + end.y;
        return line;
    }

    movePosition(data){
        this.data.x = data.x || this.data.x; 
        this.data.y = data.y || this.data.y;
        this.autoPosition();
    }

    spritesPosition(){
        let spritesLength = this.sprites.length;
        if(spritesLength > 1){
            let allHeight = ( spritesLength );
                allHeight = (allHeight * 120) / 2;

            let top       = (this.height/2) - allHeight + 60;
            for(let i = 0; i < spritesLength; i++){
                let sprite = this.sprites[i];
                sprite.movePosition({y : top + ( 120 * i ) })
            }

        }else if(spritesLength){
            this.sprites[0].movePosition({
                x : this.width + this.editor.spacing,
                y : this.height / 2,
            });
        }   
    }

    addSprite(e){
        let spriteX = this.width + this.editor.spacing,
            spriteY = this.height / 2;
        let spritesLength = this.sprites.length;

        if(spritesLength){
            let allHeight = ( spritesLength + 1 );
                allHeight = (allHeight * 120) / 2;

            let top       = (this.height/2) - allHeight + 60;
            for(let i = 0; i < spritesLength; i++){
                let sprite = this.sprites[i];
                sprite.movePosition({y : top + ( 120 * i ) })
            }

            spriteY = (this.height / 2) + allHeight - 60;
        }

        let color = this.color;
        if(this.index == 0){
            color = this.superior.colorList[ this.sprites.length % 5 ];
        }

        let size = this.font.size * 0.8;
        size = Math.round(size);
        size = size > 14 ? size : 14;

        let item = this.editor.addSprite({
            x     : spriteX,
            y     : spriteY,
            index : this.index,
            dom   : this.group,
            id    : this.id + '_' + this.sprites.length,
            color : color,
            minY  : this.minY,
            maxY  : this.maxY,
            data  : this,
            size  : size,
        })
        this.sprites.push(item);
    }

    settingSVGSize(){
        if(this.editor.title){

            let bbox = this.editor.title.group.bbox()
            let {width, height} = bbox;
            width  = Math.round( width + 10);
            height = Math.round( height + 10);
            
            width  = this.editor.oldWidth  > width  ? this.editor.oldWidth  : width;
            height = this.editor.oldHeight > height ? this.editor.oldHeight : height;
            this.editor.settingSVGSize({ width , height });
        }
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

        this.spacing= data.spacing || 80;
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
        return item;
    }

    settingSVGSize(data){
        
        console.log(data)
        let {width, height} = data;
        if(width  != this.width || height != this.height){

            this.width  = width;
            this.height = height;
            this.dom.size(this.width, this.height);
            this.title.movePosition({ y : this.height/2 });
        }

    }
}