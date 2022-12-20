
//------------------------- SHOWMEN DEY -------------------------------------//



class Vector{
    constructor(x,y){
        this.x=x
        this.y= y

    }

    static _distance(a,b){
        return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2)
    }

    static position_vector(a,b){
        //direction from a to b.
        return new Vector(b.x-a.x,b.y-a.y)
    }
    static _mult(a,b){
        //multiply scaler b with vector a
        return new Vector(a.x*b,a.y*b)

    }
    static _add(a,b){
        //add two vector
        return new Vector(a.x+b.x,a.y+b.y)
    }

    static to_deg(a){
        //returns an angle in degree
        return a*180/Math.PI
    }

    static to_rad(a){
        //returns an angle in radian
        return a*Math.PI/180
    }

    static angle(a,b){
        //return the angle b generates with a in deg. (right side  + and left side -)
        let angle = Math.acos(Vector.dot(a,b)/(a.magnitude()*b.magnitude()))

        if(a.x>b.x){angle *= -1}
        
       // console.log(Vector.to_deg(angle))
        if(isNaN(angle))(angle=0)
   
       return Vector.to_deg(angle)

        

    }

    static dot(a,b){
        return (a.x*b.x)+(a.y*b.y)
    }

    static normalize(a){
        a = new Vector(a.x,a.y)
        return a.normalize()
    }


    add(a){
        this.x += a.x
        this.y += a.y
       
    }

    sub(a){
        this.x -= a.x
        this.y -= a.y
    }

    mult(a){
        this.x = this.x*a
        this.y = this.y*a
       
    }

    div(a){
        this.x /= a
        this.y /= a

    }

    set_zero(){
        this.mult(0)
    }


    distance(a){
        //return the distance of this vector from 'a' vector.
        let dist= this.position_vector(a)
        return dist.magnitude()
    }
    
    magnitude(){
        return Math.sqrt(this.x*this.x+ this.y*this.y);
    }

     normalize(){
        return new Vector(this.x/this.magnitude(),this.y/this.magnitude());
    }

    // position_vector(a){
    //     //returns a position vector from point 'a' to the this.
    //     return new Vector(this.x-a.x,this.y-a.y)

    // }

}