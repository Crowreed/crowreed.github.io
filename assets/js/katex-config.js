document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\[", right: "\\]", display:true},
        {left: "\\(", right: "\\)", display:false}
        ],
        macros: {
            "\\ps": "\\left\\langle #1 , #2 \\right\\rangle",
            "\\K": "\\mathbb{K}" 
        }
    });
});