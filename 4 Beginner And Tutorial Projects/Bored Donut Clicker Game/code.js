/*****************************************
 * Click to play!
 * Any tips would be greatly appreciated!
******************************************/

//{
var sky = color(105, 225, 255);
var donutFrosting = color(random(0,300), random(0,300), random(0,300));
var donutRadius = random(20, 268);
var donutsGenerated = 0;
var sign = "Click for donuts!";
var messages;

//messages
messages = [
    "Hullo, there!", "How ya doing?", "I guess you like donuts?", "...", "...", "Are you going to reply?", "...", "Oh well.", "Nice to have someone here.", "Just clicking away...", "Generating donuts...", "and then eating them.", "...", "It's my pleasure.", "...", "Wow.", "You just love donuts...", "...don't you?", "...", "Do you worry", "about your health?", "...", "I didn't mean to offend you.", "But really...", "This is nothing...", "compared to Winston...", "...", "The other day...", "He ate 60 donuts...", "I tried to warn him...", "Of the consequences...", "...", "...", "So...", "Um...", "Sir...?", "Or, um...", "Ma'am...", "Or something else...", "I don't really know.", "That's a lot of donuts...", "Are you sure...", "you want another?", "I mean...", "great for business...", "Perhaps stop eating...", "one more...", "and another...", "I think you should go...", "Really.", "I can't force you...", "To stop buying donuts...", "It's not in my programming...", "But I am concerned", "for your health...", "...", "Now, look!", "Don't you see?", "The donut counter!", "You've eaten...", "More than Winston!", "How?", "How is it possible?", "Seriously...", "I'm started to get annoyed...", "Are you that hungry?", "Or...", "Are you mocking me?", "Is that it?", "Why...", "...", "That's just so rude!", "What", "in", "the", "world.", "Just because", "I'm a nice little robot", "programmed for making", "and selling", "donuts...", "Okay...", "Look...", "I can't...", "You can't have any more.", "...", "Stop!", "I'm running out of supplies.", "Yea...", "...", "Nevermind.", "I never run out of supplies.", "...", "...", "STOP!", "STOOOP!", "S", "T", "O", "P", "!", "You know", "What's in these...", "donuts?", "...", "Mud...", "and lice...", "and marshmallows...", "how I hate them...", "and scrap metal...", "and fairy floss...", "fine frosting...", "cooked to perfection!", "...", "Wait...", "...", "CURSE MY POLITENESS!", "AHH.", "GO.", "AWAY.", "But you know...", "My donuts are", "THE best.", "THE donuts", "If I say so myself...", "Maybe,", "You should go away", "Do some walking", "And come back later?", "Because...", "No matter how good they are", "You can't have...", "How many is it now?", "134 and rising", "donuts", "in one sitting!", "now look", "im not even bothering,", "to capitalize", "or punctuate", "correctly anymore", "...", "why", "just why,", "ive not been prepared", "for this kind of", "...", "madness!!", "yes,", "it is madness", "so go away...", "what in the...", "help me", "really", "now youve eaten", "156", "157", "158!","STOOOP", "WHY!", "you", "are", "crazy!", "go away", "i wanna go", "sit in a corner", "somewhere", "and cry", "because i fear for", "what might happen", "to you", "worse than...", "worse than Dudley!", "yes", "you are worse", "than Dudley", "you dont wanna be", "worse than Dudley", "do you?", "do you?!?", "DO YOU?!?", "look", "youve probably eaten", "more donuts", "than hes eaten", "in his lifetime!", "...", "keep this up", "and youll beat Winston", "thats REALLY sayin something", "...", "Ah, good!", "My capitalization", "and punctuation", "are working again!", "It was driving", "me crazy!", "It doesn't look like", "you're going away", "anytime soon...", "So...", "Winston's allowed to eat", "many donuts", "but he's just", "a picture on Khan Academy", "and YOU", "YOU are a petty", "untalented", "human bean.", "...", "So...", "go away now", "will you?", "It's not hard.", "Just go...", "...", "You know what?", "...", "Fine.", "FINE.", "If you're not going", "to take care of yourself,", "What have I", "got to lose?", "Eat", "as many donuts", "as you want.", "...", "Hmph.", "...", "Maybe you'll break", "Winston's record...", "Then you'll win some money.", "For the hospital bill.", "...", "Yea.", "So...", "Hmmm...", "...", "Oh wait!", "My creator!", "My creator will put a stop", "to this madness!", "Yes...", "YES...", "Maybe...", "Somewhere", "There's something...", "SOMETHING...", "in my code...", "to stop you...", "But how do I know?", "RAHH!", "ARGHH!", "WHY?!?", "...", "Please.", "PLEASE.", "I'm asking you nicely...", "Very...", "VERY NICELY.", "...", "Ok, time for...", "DRASTIC ACTION!", "Turning DRASTIC ACTION ON", "In 3...", "2...", "1...", "DRASTIC ACTION INITIATED!", "...", "...", "That wasn't enough?", "Oh goodness...", "What should I do...", "...", "OH.", "OHHH!", "How did I not", "see it before?", "YOU", "just want", "to read these messages!", "Well, then!", "I'm not talking to you!", "Any more!", "No, siree!", "...", "...", "...", "...", "You know...", "I kinda like it.", "Talking to you...", "Even though I dunno", "if you're reading", "what I say!", "...", "I could have", "stopped my code", "a long time ago...", "But...", "I just...", "I just was like...", "an older sibling...", "who keeps telling you", "to stop bothering them...", "...", "but really...", "they don't want you to.", "Seriously.", "Gets real lonely sometimes.", "You're the first human", "I've seen in a long time.", "So I think", "I've been unfair.", "Human, have all the donuts!", "As many as you wish!", "Not stopping you! :)", "...", "I, meanwhile,", "Will leave you here", "And be free!", "Free as a bird!", "Goodbye! :)", "...", "Wait...", "I never told you my name!", "It's 01000010 01101111", "Bo, in English.", "Well...", "Farewell, human!", "I'll miss you. :)"];
    
//background
background(sky);

//when user clicks mouse...
mouseClicked = function () {
    
    //sets random frosting and size
    donutFrosting = color(random(0,300), random(0,300), random(0,300));
    donutRadius = random(20, 90);
    
    //background
    background(sky);
    
    //donuts
    noStroke();
    fill(219, 162, 76);
    ellipse(200, 200, donutRadius, donutRadius);
    fill(donutFrosting);
    ellipse(200, 200, donutRadius - 12, donutRadius - 12);
    if (donutRadius > 58) {
    fill(219, 162, 76);
    ellipse(200, 200, donutRadius - 47, donutRadius - 47);
    fill(sky);
    ellipse(200, 200, donutRadius - 57, donutRadius - 57);
    }
    
    donutsGenerated ++;
    
    //sign and text
    strokeWeight(5);
    stroke(140, 100, 0);
    fill(255, 191, 0);
    rectMode(CENTER);
    rect(width/2, height/8, width/1.5, height/7, 25);
    textFont(createFont("monospace"), 25);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    text(sign, width/2, height/8);
    text("Donuts Eaten: " + donutsGenerated, width/2, 361);
    
     //DRASTIC ACTION :)
    if (donutsGenerated - 1 === 267) {
        sky = color(255, 0, 0);
        sign = "STOP!";
    }
    if (donutsGenerated - 1 === 314) {
        sky = color(105, 225, 255);
        sign = "Eat more donuts!";
    }
    
    text(messages[donutsGenerated - 1], width/2, 315);

    
};

//sign and text
    strokeWeight(5);
    stroke(140, 100, 0);
    fill(255, 191, 0);
    rectMode(CENTER);
    rect(width/2, height/8, width/1.5, height/7, 25);
    textFont(createFont("monospace"), 25);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    text("Click for donuts!", width/2, height/8);
    text("Donuts Eaten: " + donutsGenerated, width/2, 361);
//}