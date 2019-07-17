window.addEventListener('load', () => {
    
    let menus = document.querySelectorAll('ul.main-nav > li > a');

    menus.forEach(menu => {
        // console.log(menu, menu.getAttribute('href'));
        // console.log(menu.getAttribute('href'), window.location.pathname)
        if ( menu.getAttribute('href') === window.location.pathname ) {
            menu.classList += ' active';
        }
    });

});