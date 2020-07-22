#!/bin/bash
# prerequisite: https://www.npmjs.com/package/uglify-js

echo "Building js file for TSM out of three parts."


mousewheelFile="./js/minified/jquery.mousewheel.min.js"

echo "/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */ " > $mousewheelFile
uglifyjs --compress --mangle -- ./js/uncompressed/jquery.mousewheel.js >> $mousewheelFile


mcsFile="./js/minified/jquery.mCustomScrollbar.min.js"

echo "/* == malihu jquery custom scrollbar plugin == Version: 3.1.5.TSM, License: MIT License (MIT) */" > $mcsFile
uglifyjs --compress --mangle -- ./jquery.mCustomScrollbar.js >> $mcsFile


customScriptFile="./tsm.js"

resultFile="./jquery.mCustomScrollbar.concat.min.js"


echo "/* Built from source code https://github.com/capslocky/malihu-custom-scrollbar-plugin */" > $resultFile
echo "/* Built date: $(date) */" >> $resultFile
echo >> $resultFile

cat $mousewheelFile >> $resultFile

echo >> $resultFile
echo >> $resultFile

cat $mcsFile >> $resultFile

echo >> $resultFile
echo >> $resultFile

cat $customScriptFile >> $resultFile

echo "Result file is $resultFile"
echo "Done."
