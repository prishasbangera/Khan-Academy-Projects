function drawPerson() {
  person.loadPixels();
  let p = person.pixels;
  for (let i = 0; i < p.length; i+=4) {
    if (p[i] > 100) p[i+3] = 0; 
      else p[i+3] = 150;
  }
  person.updatePixels();
  image(person, width*0.5, height*0.8,  
    person.width*0.5, person.height*0.5);
}