class Sensor{
    constructor(angle,len,car,wall){
      
        this.start= car.pos
        this.angle = angle
        this.len = len
        this.wall = wall
        this.car = car

        this.end_pos=get_end_pos(this.start,this.angle-this.car.rot,this.len)

        this.line = new Shape('white')

        this.draw()
    }

    update(obstacle){
        this.start= this.car.pos 
        this.end_pos = get_end_pos(this.start,this.angle-this.car.rot,this.len)

        let p=this.get_min_dist(obstacle)
        if(p.length>0){
           

            if(p[0]<=10){
                //if the distance is less the 1 then car will die
                this.car.die()
            }
             //if there is intersecion point then update the end pos of the sensor
            this.end_pos= p[1]
            
        }
        else{
            //else get the normal end pos of the sensor
            this.end_pos = get_end_pos(this.start,this.angle-this.car.rot,this.len)
            p= [this.len] //if there is no intersection then set distance  to original distance
        }

        this.draw()

        return p[0] //scaling by dividing by 1e6

        
  

     
    }

    get_min_dist(obstacle){
  
        let point=[] ;

        obstacle.forEach(line =>{

           point.push(is_intersecting(this.start,this.end_pos,line.start,line.end))

          })

         return get_min(point) //contains min intersection point and distance

    }

    draw(){
        
        //this.end_pos = get_end_pos(this.car.pos,this.angle,this.len)
        //this.line.drawPolarLine(this.start.x,window.innerHeight-this.start.y,this.len,this.angle,this.wall)
        this.line.drawLine(this.start.x,window.innerHeight-this.start.y,this.end_pos.x,
            window.innerHeight-this.end_pos.y,2,this.wall)
      

    }
}