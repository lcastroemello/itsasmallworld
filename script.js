(function() {
    var inp = $("input");
    var resultsElem = $("#results");
    var val;
    //
    //
    // 1.Input
    inp.on("input", function() {
        console.log(inp.val());
        val = inp.val();
        function request() {
            $.ajax({
                url: "https://flame-egg.glitch.me/",
                method: "GET",
                data: {
                    q: val
                },
                success: function(response) {
                    console.log("response from flame-egg: ", response);
                    if (val == inp.val()) {
                        if (val == 0) {
                            $("#results").addClass("hidden");
                        } else {
                            $("#results").removeClass("hidden");
                        }
                        //this function works (when you delete everything, the list will disappear)

                        console.log(response.length);
                        if (response.length == 0) {
                            console.log("inside the if block", response);
                            resultsElem.html(
                                '<div class="resultBox">' +
                                    "No results" +
                                    "</div>"
                            );
                            return;
                        }

                        var resultsElements = "";
                        for (var i = 0; i < response.length; i++) {
                            resultsElements +=
                                '<div class="resultBox">' +
                                response[i] +
                                "</div>";
                        }
                        resultsElem.html(resultsElements);
                    }
                }
            });
        }
        // resultsElem.html(resultsHtml);
        // Bonus: Throttling
        if (val != inp.val()) {
            clearTimeout(timer);
        }
        var timer = setTimeout(request, 250);
    }); //this function works (get 4 results and make them show in screen as new html elements)
    //
    //
    //2. Mouseover
    // !!! RESOLVER BUG MOUSEOUT
    resultsElem.on("mouseover", function(e) {
        e.stopPropagation();
        $(e.target).addClass("on");
        $(e.target)
            .prev()
            .removeClass("on");
        $(e.target)
            .next()
            .removeClass("on");
        console.log($(e.currentTarget));
    }); //this function works (mouseover)
    //
    //
    // 3.mousedown

    resultsElem.on("mousedown", function(e) {
        val = inp.val($(e.target).text());
        $("#results").addClass("hidden");
    }); //this function works (text from country list appears on input)
    //
    //
    // // 4.Keydown

    inp.on("keydown", function(e) {
        console.log("e.target", $(e.target));
        if (e.keyCode === 13) {
            console.log("enter");
            val = inp.val($(".resultBox.on").text());
            $("#results").addClass("hidden");
        } else if (e.keyCode === 38) {
            console.log("top");
            e.stopPropagation();
            if (resultsElem.children().hasClass("on")) {
                $(".on")
                    .prev()
                    .addClass("on");
                $(".on")
                    .next()
                    .removeClass("on");
            } else {
                resultsElem.children(":last").addClass("on");
            }
        } else if (e.keyCode === 40) {
            console.log("bottom");
            e.stopPropagation();
            if (resultsElem.children().hasClass("on")) {
                $(".on")
                    .next()
                    .addClass("on");
                $(".on")
                    .prev()
                    .removeClass("on");
            } else {
                resultsElem.children(":first").addClass("on");
            }
        }
    }); //this function works (buttondown)
})();
