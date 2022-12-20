

let increment_angle =30 
class Path{
    constructor(wall){
        this.wall = wall
        this.lines=[]
        this.lines1=[]

        for(let i =0;i<360;i+= increment_angle){
            this.lines.push(new Line(this.wall)) //for inner circle
            this.lines1.push(new Line(this.wall)) //for outter circle 
        }
    }

    draw(center,radius){
        let pt1,pt2;
        for(let i=0; i<360; i+= increment_angle){
            //inner circle
             pt1= get_end_pos(center,i,radius)
             pt2=get_end_pos(center,i+increment_angle,radius)
            this.lines[i/increment_angle].draw(pt1,pt2)

            //outter circle
            pt1= get_end_pos(center,i,radius+100)
            pt2=get_end_pos(center,i+increment_angle,radius+100)
           this.lines1[i/increment_angle].draw(pt1,pt2)
        }
    }
}





class Line {
    constructor(wall){
        
        this.wall = wall

        this.body = new Shape('white')

        
    }


    draw(start,end){
        this.start= start
        this.end =end
        this.body.drawLine(start.x,window.innerHeight-start.y,end.x,window.innerHeight-end.y,2,this.wall)
    }
}