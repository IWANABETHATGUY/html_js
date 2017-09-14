const con = document.getElementsByClassName('container')[0],
    items = document.querySelectorAll('.item');
/**
 * 函数声明
 */
let init = function () {
    for (let i = 0, len = items.length; i < len; i++) {
        let left = (i % 4) * 100 + 'px',
            top = Math.floor(i / 4) * 100 + 'px';
        items[i].style.top = top;
        items[i].style.left = left;
        items[i].innerHTML = i + 1;
    }
};
let findIndx = function (element) {
    return Array.prototype.indexOf.call(items, element);
};
// let scaleHandler = function(e) {
//     e.target
// }
con.addEventListener('click', (e) => {
    const target = e.target;
    if (target.className === 'item') {
        target.classList.add('active');
        Velocity(target, {
            width: '400px',
            height: '400px',
            left: 0,
            top: 0
        }, {
            duration: 300
        });
    } else if (target.className === 'item active') {
        let index = findIndx(target);
        target.classList.remove('active');
        Velocity(target, {
            width: '100px',
            height: '100px',
            left: (index % 4) * 100 + 'px',
            top: Math.floor(index / 4) * 100 + 'px'
        }, {
            duration: 300
        });
    }
});

init();