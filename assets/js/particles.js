export function initParticles(){
    tsParticles.load("tsparticles", {
        fpsLimit: 100,
        "particles": {
            "number":  {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 500
                }
            },
            "collisions": {
                "enable": true,
                "mode": "bounce"
            },
            "color": {
                "value": "#7451eb"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0.5,
                    "color": "#7451eb"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#271a38ff",
                "opacity": 0.85,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": ["repulse"]
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 300,
                    "size": 4,
                    "duration": 5,
                    "opacity": 8,
                    "speed": 5
                },
                "repulse": {
                    "distance": 200,
                    "duration": 2
                },
                "push": {
                    "particles_nb": 1
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}