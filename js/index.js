var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 6;
        var renderer = new THREE.WebGLRenderer({antialias: true});

        renderer.setClearColor('#47476b'); 
        renderer.setSize(window.innerWidth,window.innerHeight);


        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();
        });

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        // box geometry
        // var geometry = new THREE.BoxGeometry(1, 1, 1); 
        // prism geometry
        var geometry = new THREE.CylinderGeometry(0, 1, 1, 4, 1);

        geometry.computeBoundingSphere();

        var material = new THREE.MeshLambertMaterial({color: 666699}); 



        meshX = -10;
        for(var i = 0; i < 20; i++){
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;
            scene.add(mesh);
            meshX += 1;
        }


        var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
        light.position.set(0,0,0);
        scene.add(light);

        var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
        light.position.set(0,0,25);
        scene.add(light);

        

        var render = function(){
            requestAnimationFrame(render);

            renderer.render(scene,camera);
        };

        // random number between -2 and 2
        var randomNum = (Math.random() - 0.5) * 4;

        function onMouseMove(event) {
            event.preventDefault();

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);

            for(var i = 0; i < intersects.length; i++) {

                this.tl = new TimelineMax();
                this.tl.to(intersects[i].object.scale, 1, {x: 1.1, y: 1.1, z: 1.1, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.scale, 1, {x: 0.9, y: 0.9, z: 0.9, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.position, .5, {z: intersects[i].object.position.z + randomNum, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.rotation, .5, {y: intersects[i].object.rotation.y + Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
            }
        }

        render();

        

        window.addEventListener('mousemove', onMouseMove);