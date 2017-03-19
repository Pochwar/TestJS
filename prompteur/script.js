var phrase = "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.";

var phrase2 = "Saule ... , ostendit quod hoc quidem ... hoc quod dixit, ... potuit adiutorium mihi, et educat me in tota vita nova facio certus ut Im 'non invenit. Ego quidem illius memini Saul. Gus sit amet interfíciat mei tota familia. Nunc opus est mihi iste. Saul ... nunc Saule." +
    "Suspicio? Bene ... tunc ibimus? Quis uh ... CONEXUS locus his diebus? Quisque semper aliquid videtur, in volutpat mauris. Nolo enim dicere. Vobis neque ab aliis. Ego feci memetipsum explicans. Gus mortuus est. Lorem opus habeo." +
    "Jackson Isai? Tu quoque ... A te quidem a ante. Vos scitis quod blinking res Ive 'been vocans super vos? Et conteram illud, et conteram hoc. Maledicant druggie excors. Iam hoc tu facere conatus sum ad te in omni tempore?" +
    "Ludum mutavit. Verbum est ex. Et ... sunt occidat. Videtur quod est super omne oppidum. Quis transfretavit tu iratus es contudit cranium cum dolor apparatus. Qui curis! Modo nobis certamen est, qui non credunt at. ";

var phrase3 = "Lollipop liquorice cookie. Gingerbread chocolate bar gingerbread apple pie. Lemon drops candy canes brownie croissant caramels liquorice. Chupa chups sweet chocolate gingerbread wafer pie pie croissant. Sesame snaps tart gummi bears ice cream marzipan sweet toffee. Tiramisu pudding apple pie chocolate jelly. Dessert marshmallow jelly beans jujubes jelly beans wafer wafer dessert ice cream. Cheesecake toffee caramels oat cake dessert liquorice. Tiramisu tootsie roll brownie cupcake biscuit cookie. Jelly-o macaroon ice cream candy canes jelly-o. Croissant cheesecake lollipop marzipan caramels sweet sweet sesame snaps carrot cake. Cheesecake pie gingerbread dessert cake.";



function prompter(phrase,element,delay){
    var array = phrase.split(' ');
    var i = 0;

    var interval = setInterval(function () {
        document.getElementById(element).innerHTML += array[i] + ' ';
        ++i;
        if (!array[i]){
            clearInterval(interval);
        }
    },delay);

}

// var inter1 = setInterval(function () { addWord(phrase,'#msg',inter1); },50);
// var inter2 = setInterval(function () { addWord(phrase2,'#msg2', inter2); },50);

prompter(phrase, 'msg', 50);
prompter(phrase2, 'msg2', 150);
prompter(phrase3, 'msg3', 10);