    // RestCalls
    function RestCalls(Myurl, error, f) {
    if (!Myurl.match(psiteUrl))
    Myurl = _spPageContextInfo.webAbsoluteUrl + Myurl;
    $.ajax({
    url: Myurl,
    method: "GET",
    headers: {
    "Accept": "application/json; odata=verbose"
    },
    success: function(data) {
    f(data.d.results)
    },
    error: function(data) {
    console.log(error)
    }
    })
    }
    // Iframe
    function iframe(url,selector,height){
    $(selector).empty();
    $('<iframe>', {
    src: url,
    id:  'MainIframe',
    'class':'MainIframe',
    frameborder: 0,
    height: height,
    scrolling: "no",
    width: '100%'
    }).appendTo(selector);
    $('.MainIframe').load(function(){
    $('.MainIframe').contents().find('body').addClass('ms-fullscreenmode');
    $('.MainIframe').contents().find('#s4-ribbonrow,.od-SuiteNav,.Files-leftNav,.od-TopBar-header.od-Files-header,.pageHeader,.ql-editor,#titlerow .ms-table,.annouce,.announcetxt,.sitePage-uservoice-button,.footer').hide();
    $('.MainIframe').contents().find('#s4-ribbonrow,.od-SuiteNav,.Files-leftNav,.od-TopBar-header.od-Files-header,.pageHeader,.ql-editor,#titlerow .ms-table,.annouce,.announcetxt,.sitePage-uservoice-button,.footer').css('display','none');
    $('.MainIframe').contents().find('.Files-mainColumn').css('left','0');
    $('.MainIframe').contents().find('.Files-belowSuiteNav').css('top','0px');
    });
    }
    // check user member of usergroup
    function IsCurrentUserMemberOfGroup(groupName, OnComplete) {
        var currentContext = new SP.ClientContext.get_current();
        var currentWeb = currentContext.get_web();
        var currentUser = currentContext.get_web().get_currentUser();
        currentContext.load(currentUser);
        var allGroups = currentWeb.get_siteGroups();
        currentContext.load(allGroups);
        var group = allGroups.getByName(groupName);
        currentContext.load(group);
        var groupUsers = group.get_users();
        currentContext.load(groupUsers);
        currentContext.executeQueryAsync(OnSuccess, OnFailure);

        function OnSuccess(sender, args) {
            var userInGroup = false;
            var groupUserEnumerator = groupUsers.getEnumerator();
            while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                if (groupUser.get_id() == currentUser.get_id()) {
                    userInGroup = true;
                    break;
                }
            }
            OnComplete(userInGroup)
        }

        function OnFailure(sender, args) {
            OnComplete(false)
        }
    }
    // check user has permission to access
    function IsCurrentUserHasContribPerms(){
    IsCurrentUserMemberOfGroup("Site Managers",function(isCurrentUserInGroup){if(!isCurrentUserInGroup){
    $('.footer .list-inline').hide();
    $('.footer .list-inline').css('display','none');
    }});

    //check user membership that works with nested groups
    function IsCurrentUserMember(groupname,OnComplete){
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/sitegroups/getbyname('"+groupname+"')/CanCurrentUserViewMembership",
            method: "GET",
            headers: {"Accept": "application/json; odata=verbose"},
            success: function(data) { console.log(data.d.CanCurrentUserViewMembership);
            OnComplete(data.d.CanCurrentUserViewMembership)
            },
            error: function(data) {
            console.log(error);
            OnComplete(false);
            }
        });  
    }


    IsCurrentUserMember('pp',function (result){
        //do sth
        if(result)
            //do truthy
        else
            //do falsey
    })