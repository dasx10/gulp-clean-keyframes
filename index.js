const animReg=/animation:+[^;]+;/ig;
let animations=new Set();
let checkFrames=new Set();
const getNameAnimation=animation=>animation.replace(': ',':').split(':')[1].split(' ')[0];
const findAnimations=data=>{
    let animation = animReg.exec(data);
    if (animation && animation.length) {
        animations.add(animation[0]);
        findAnimations(data);
    }return data;
}
const gutil= require('gulp-util');
const through=require('through2');
module.exports=()=>through.obj(function(blobFile,enc,cb) {
    if (blobFile.isNull()){
        cb(null, blobFile);
        return;
    }
    if (blobFile.isStream()){
        cb(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
        return;
    }
    let file = blobFile.contents.toString();
    file = findAnimations(file);
    frames = file.split('@keyframes');
    file = frames[0]
    for(let i=1;i<frames.length;i++){
        animations.forEach(anim => {
            let name=getNameAnimation(`${anim}`);
            name=eval(`/${name}[\{| ]/`);
            let checkFrame=name.exec(frames[i]);
            if(checkFrame)checkFrames.add("@keyframes"+checkFrame.input);
        })
    }
    checkFrames.forEach(frame => file += frame);
    blobFile.contents=new Buffer(file);
    this.push(blobFile);
    cb();
});