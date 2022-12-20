
//------------------------- SHOWMEN DEY -------------------------------------//


class Shape{
    constructor(color){
        this.position= 'absolute';
        this.backgroundColor= color;
        this.rect=document.createElement('div');
      //  this.k = new Array(Math.round(Math.PI*2/.05)+1);
        this.called = false;
        this.z_index =1;
        
        

      


    }

    createDiv(width,height){
     
        this.rect.style.width= String(width)+'px';
        this.rect.style.height= String(height)+'px';
        this.rect.style.backgroundColor= this.backgroundColor;
        this.rect.style.position= this.position;
        this.rect.style.zIndex= (this.z_index);
    
       
    }



    update(pos_x,pos_y){
        this.rect.style.left = String(pos_x-(this.width/2))+'px';
        this.rect.style.top= String(pos_y-(this.height/2))+'px';

    }

    drawRect(width,height,pos_x,pos_y,wall){
        this.width= width ;
        this.height= height ;
        this.createDiv(this.width,this.height);
        this.rect.style.left = String(pos_x-(this.width/2))+'px';
        this.rect.style.top= String(pos_y-(this.height/2))+'px';
        // this.rect.style.backgroundImage= "url('./car2.png')";
        this.rect.style.opacity=1
        this.rect.style.zIndex= 3;
        wall.appendChild(this.rect);
      //  this.rect.classList.add('best_car')
        return this.rect;

    }

    drawCircle(radius,pos_x,pos_y,wall){
        this.width=radius;
        this.height= radius;
        this.createDiv(this.width,this.height);
        this.rect.style.borderRadius= String(100)+'%';
        this.rect.style.left= String(pos_x-(this.width/2))+'px';
        this.rect.style.top= String(pos_y-(this.height/2))+'px';

        this.rect.style.backgroundImage= "url('bird.png')"; 
        this.rect.style.backgroundSize= 'cover';
        wall.appendChild(this.rect);
        

        return this.rect;
        
       
    };

    drawLine(x1,y1,x2,y2,height=2,wall){
        let dist = Math.sqrt((x2-x1)**2+ (y2-y1)**2);
        this.width= dist;
        this.height= height;
        this.createDiv(dist,this.height);
        //first draw the line from the left point and rotate it according to the slope.
        if(x1<=x2){
            this.rect.style.left= String(x1)+'px';
            this.rect.style.top= String(y1)+'px';
        }
        else{
            this.rect.style.left= String(x2)+'px';
            this.rect.style.top= String(y2)+'px';
        }
        this.rect.style.transformOrigin= 'left';
        this.rect.style.transform= `rotate(${Math.atan((y2-y1)/(x2-x1))*180/Math.PI}deg)`;
        this.rect.style.zIndex='2';
        wall.appendChild(this.rect);
        return this.rect
    }

    drawPolarLine(x1,y1,len,angle,wall){
        //draws a line using starting pos and an angle 
        let dist =len;
        this.width= dist;
        this.height= 5;
        this.createDiv(this.width,this.height);
        this.rect.style.left= String(x1)+'px';
        this.rect.style.top= String(y1)+ 'px';
        this.rect.style.transformOrigin= 'left';
        this.rect.style.transform= `rotate(${-angle}deg)`;

        wall.appendChild(this.rect);
    };

  
  


    drawSimpleCircle(radius,c_x,c_y,wall){

        if (!this.called){

            this.called = true;
            for (let i =0; i<this.k.length; i++){
                this.k[i]= new Shape(this.backgroundColor);
            }

        }

        this.iter = 0;
       
      // console.log(l)
        let prevX = c_x+radius;
        let prevY = c_y ;



        for(let i =0; i<= Math.PI*2; i+= .05){

        let x= c_x+ radius*Math.cos(i);
        let y = c_y- radius*Math.sin(i);

        // let c = new Shape('white');

        this.k[this.iter].drawLine(prevX,prevY,x,y,wall);
        this.iter += 1;

        
        prevX = x;
        prevY=y;



        
    
    }
    };



   
    


}