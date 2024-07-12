const LOGO_CELL_NAME = 'LogoCell';
const KPI_VIEW_AREA_ITEM_NAME = 'KPIs';
const REQUEST_LIST_AREA_ITEM_NAME = 'Requests';
const HEADER_AREA_ITEM_NAME = 'Header';
const SEARCH_BAR_CONTROL_NAME = "Auto-Complete";

const MOBILE_HEADER_HEIGHT = 100;

detectClicks = () => {
    $(document).click(function (event) {
        console.log(event.target)
    });
}

isMobile = () => $('html').hasClass("mobile");

$(document).ready(function () {
    enableTheme();
    render();
    //    detectClicks();
});

enableTheme = () => {
    $('body').addClass('psf');
    $('form').addClass('psf');
    $('.runtime-content').addClass('psf');
    $('.runtime-form').addClass('psf');
}

render = () => {
    renderHeader();
    renderNavigation();
    renderKPIs();
    renderSearchBox();
}

renderNavigation = () => isMobile() ? renderDrawer() : renderSidebar();

renderSidebar = () => {
    const sidebar = $("<div id='sidebar' class='sidebar'></div>");
    $('.runtime-content').append(sidebar);
    $('.runtime-content').addClass('with-sidebar');
    if (!isMobile()) {
        let logoSpan = $('span[name="' + LOGO_CELL_NAME + '"]');
        logoSpan.addClass('logo');
        $('<div id="logo" class="logo">' + logoSpan.html() + '</div>').prependTo($('#sidebar'));
        $('div.logo').height($('div.header').height())
    };
    if ($('ul.tab-box-tabs').length > 0) {
        $('#sidebar').append('<div id="tabs" class="sidebar-tabs">')
        $('.sidebar-tabs').append($('ul.tab-box-tabs'));
        $('a.tab').append('<div class="sidebar-border"><span class="top"></span><span class="bottom"></span></div>');
    }

}

renderKPIs = () => {
    $('div[name="' + KPI_VIEW_AREA_ITEM_NAME + '"]').closest('.view').addClass('kpi')
    renderKPICard("active", 1);
    renderKPICard("overdue", 3);
    renderKPICard("urgent", 5);
    renderActionCard("new", 1, "btnNavNew");
    renderActionCard("reports", 2, "btnNavReporting");
    renderActionCard("admin", 3, "btnNavAdmin");
    renderListView();
}

renderKPICard = (name, cardIndex) => {
    $('<div id="' + name + '" class="card ' + name + '">').prependTo('div[name="tblKPIs"]')
    cardDiv = $('#' + name)
    labelSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="1"]');
    labelSpan.addClass('kpi-label');
    imageSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="2"]');
    imageSpan.addClass('kpi-icon');
    numberSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + (cardIndex + 1) + '"][row="2"]');
    numberSpan.addClass('kpi-number');
    textSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="1"] > div > span[col="' + cardIndex + '"][row="3"]');
    textSpan.addClass('kpi-text');

    [labelSpan, imageSpan, numberSpan, textSpan].forEach((e) => cardDiv.append(e));
}

renderActionCard = (name, cardIndex, btnName) => {
    $('<div id="' + name + '" class="actions card ' + name + '">').appendTo('div[name="tblKPIs"]')
    cardDiv = $('#' + name)
    labelSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="1"]');
    labelSpan.addClass('kpi-label');
    imageSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="2"]');
    imageSpan.addClass('kpi-icon');
    textSpan = $('.psf div.kpi .panel-body-wrapper div[name="tblResponsiveIcons"]> span[col="3"] > div > span[col="' + cardIndex + '"][row="3"]');
    textSpan.addClass('kpi-text');

    [labelSpan, imageSpan, textSpan].forEach((e) => cardDiv.append(e));
    //$('div.card.' + name).click(() => $('div.card.' + name + '>span>img').click());
    $(cardDiv).click(function() { $("[name='" + btnName + "']").trigger('click') });
}

renderListView = () => {
    $('div[name="' + REQUEST_LIST_AREA_ITEM_NAME + '"]').closest('.view').addClass('requests');
}

renderHeader = () => {
    $('div[name="' + HEADER_AREA_ITEM_NAME + '"]').closest('.view').addClass('header');
    $('span[name="' + LOGO_CELL_NAME + '"]').addClass('logo');
    if (isMobile()) {
        renderMobileHeader();
    }
}

renderSearchBox = () => {
    $('div[name="' + SEARCH_BAR_CONTROL_NAME + '"]').addClass('search-control');
}

renderMobileHeader = () => {
    var headerView = $('.header')

    var headerOffset = 0;
    $('form').scroll(function () {
        var currentPos = $('form').scrollTop()
        if (headerOffset === 0) {
            headerOffset = headerView.height() / 2;
        }
        if (currentPos >= headerOffset) {
            headerView.addClass('fixed');
        } else {
            headerView.removeClass('fixed');
        }
    });
}

function renderSlider() {
    
    $("#sidebar").css("display", "none");
    var imageHtmlCollapsed = '<span class="material-symbols-outlined">menu</span>';
    var imageHtmlExpanded = '<span class="material-symbols-outlined">menu_open</span>';
    var sidebarToggle = $("#sidebar-handler");

    // Check if the sidebar handler exists, if not, create it
    if (sidebarToggle.length === 0) {
        var html = '<div id="sidebar-handler" class="sidebar-handler">' + imageHtmlCollapsed + '</div>';
        $("#sidebar").before(html);
        sidebarToggle = $("#sidebar-handler"); // Re-assign to the newly created element
    }

    //Close on tab click
    $('span.tab-text').click(function() {
        console.log('tab clicked');
        $("#sidebar").css("display", "none");
        $("#sidebar").removeClass("left-shadow-overlay");
    });
    
    $('#sidebar-handler').click(function() {
        console.log('clicked burger')
        if($("#sidebar").css("display") === "none"){
            $("#sidebar").css("display", "grid");
            $("#sidebar").addClass("left-shadow-overlay");
            var sidebarWidth = $("#sidebar").outerWidth();
            $("#").css("margin-left", sidebarWidth + "px");
        }
        else
        {
            $("#sidebar").css("display", "none");
            $("#sidebar").removeClass("left-shadow-overlay");
            $("#").css("margin-left", "0px");
        }
    });    
}

renderDrawer = () => {
    renderSidebar();
    renderSlider();
}

/*

$('input[name="Search Box"]').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            var value = e.currentTarget.value;
            $(e.currentTarget).SFCTextBox('option', 'text', value);
            $('a[name ="Search Button"]').click();
            return false;
        }
    })
*/