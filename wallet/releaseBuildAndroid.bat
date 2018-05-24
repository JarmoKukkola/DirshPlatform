ionic cordova build android --prod --release --aot

rem above gets stuck, if firebase is update. Below is less optimized alternative.

rem ionic cordova build android --aot --minifyjs --minifycss --release