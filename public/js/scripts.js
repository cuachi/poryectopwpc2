$(()=>{
    var isHide = null;
    $("#post-comment").hide(()=>{
        isHide=true;
    });
    $("#btn-comment").on('click',()=>{
        event.preventDefault();
        if (isHide) {
            $("#post-comment").show(()=>{
                isHide=false;
            });
        } else {
            $("#post-comment").hide(()=>{
                isHide=true;
            });
        };
    });

    $("#btn-like").on('click',()=>{
        var imgId = document.querySelector("#btn-like");
        $.post(`/images/like/${imgId.dataset.id}`).done((data)=>{
            $('.likes-count').text(data.likes)
        });
    });
});