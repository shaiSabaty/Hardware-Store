/* *******************************
 * Popup.js v1.2.5
 * Notice: The Plugin structure and style base on centerPopup from old.
 * ******************************* */

/* *******************************
   Update Note:
    1. Fix same source but not different trigger.
    2. The trigger element have not buddled when trigger.
    3. Binding source event(e.g. shown.ng.popup,hidden.ng.popup).
    4. Adding fixed popup's window top size.
    5. Adding custom width,height.
 * ******************************* */

/*
*Popup Useage:*
//you want to use this plugin, you just add "open-popup" class you trigger place,like this" class='open-popup'".
<a id="source3" href="javascript:;" class="open-popup btn" data-source-id="source3">normal</a>

*Popup source:*
<div id="source3_Content" style="display: none;">
    <!-- your content put here -->
</div>

*Popup structure:*
<div class="centerPopup">
    <div class="centerPopup-body">
        <a href="javascript:;" class="fa fa-close centerPopup-close"></a>
        <!-- your content put here -->
    </div>
</div>
*/

/*Even Listen and callback:
From trigger or source:
 $("selector").on("shown.ng.popup",function(e,api){
     //api: popup self.
     //api.$target: popup layer.
     //api.$source: popup trigger element.

     //if you want to choose tag in popup layer, you can use api as follow:
     //$("selector",api.$target)

 })
 */
;
! function (window, $, document, undefined) {
    /*Event:(
     *shown.ng.popup,
     *hidden.ng.popup,
     *initialized.ng.popup)*/

    var Popup = function (element, options) {
        this.init("popup", element, options);
    }

    // Default options define
    Popup.VERSION = "1.2.5";
    Popup.SELECTORS = {
        toggleSelector: ".open-popup",
        popupSelector: ".centerPopup",
        sourceSelector: ".centerPopup-source",
        closeSelector: ".centerPopup-close,.centerPopup-trigger-close",
        arrowSelector: ".centerPopup-arrow",
        arrowTopLeftSelector: ".docked-top-left",
        arrowTopRightSelector: ".docked-top-right",
        arrowBottomLeftSelector: ".docked-bottom-left",
        arrowBottomRightSelector: ".docked-bottom-right",
        maskSelector: "#popup_overlay"
    };
    Popup.TRANSITION_DURATION = 150;
    Popup.BACKDROP_TRANSITION_DURATION = 100;
    Popup.DEFAULTS = {
        trigger: "click", //click/hover/manual
        placement: "center", //center/follow/70(custom when you fill out a figure);
        width: "",
        height: "",
        mask: "overshow", //overshow/overnone/none
        isarrow: false,
        arrowspacing: 14,
        type: "centerPopup",
        domain: "ng.popup",
        effect: false, //expansion
        initializeback: "", //function
        showback: "", //function
        hideback: "", //function
        aftercloseback: "",//function
        spacing: 5,
        noexit: false, // remove X anchor and disable overlay from closing popup
        timeout: 20, // timeout duration, scroll/resize consumes
        template: "<div class='centerPopup'><div class='centerPopup-body'><a href='javascript:;' class='fa fa-close centerPopup-close'></a>$$content$$</div></div>"
    };
    Popup.VISIBLEPOPUPS = [];
    // Alias
    Popup.fn = Popup.prototype;

    //Initialization
    Popup.fn.init = function (type, element, options) {
        var ths = this;

        // Option priority: data - options > incoming - options > default -options
        this.options = $.extend({}, Popup.DEFAULTS, Popup.SELECTORS, options);

        this.type = type || this.options.type;
        this.$element = $(element);
        this.$source = this.getSource();
        this.globalState = {
            scroll: true,
            resize: true
        };

        // Trigger init event
        this.trigger(type, this.options.toggleSelector);
        this.backInit();
    };

    //Trigger bind
    Popup.fn.trigger = function (type, selector) {
        var triggers = this.options.trigger.split(/\s/ig);

        for (var i = triggers.length; i--;) {
            var trigger = triggers[i];

            if (trigger == "manual") {

            } else if (trigger == "hover") {

                //this.$element.on('mouseenter.' + this.options.domain, $.proxy(this.enter, this));
                //this.$element.on('mouseleave.' + this.options.domain, $.proxy(this.leave, this));
            } else {

                this.$element.on(trigger + "." + this.options.domain, $.proxy(this.toggle, this));
            }
        }
    }

    // Event
    Popup.fn.toggle = function () {
        this.$element.hasClass("is-open") ? this.hide() : this.show();
    };

    // Get source
    Popup.fn.getSource = function () {
        var $source = "",
            id = this.$element.attr("id");

        if (!this.source) {
            if (id) {
                $source = $("#" + id + "_Content");
            } else {
                $source = $("#" + this.options.sourceId)
            }
            this.$source = $source;
            this.source = $source.html();
        }
        return this.$source;
    };

    //init back
    Popup.fn.backInit = function () {
        //trigger init back
        if (this.options.initializeback && this.options.initializeback instanceof Function) {
            this.options.initializeback.call(this);
        }
        // trigger init event
        this.$element.triggerHandler(jQuery.Event("initialized." + this.options.domain), this);
        this.$source.triggerHandler(jQuery.Event("initialized." + this.options.domain), this);
    };
    Popup.fn.backHidden = function () {
        //trigger hide back
        if (this.options.hideback && this.options.hideback instanceof Function) {
            this.options.hideback.call(this);
        }
        // trigger hidden event
        this.$element.triggerHandler(jQuery.Event("hidden." + this.options.domain), this);
        this.$source.triggerHandler(jQuery.Event("hidden." + this.options.domain), this);
    };
    Popup.fn.backAfterClose = function () {
        //trigger afterclose back
        if (this.options.aftercloseback && this.options.aftercloseback instanceof Function) {
            this.options.aftercloseback.call(this);
        }
        // trigger afterclose event
        this.$element.triggerHandler(jQuery.Event("afterclose." + this.options.domain), this);
        this.$source.triggerHandler(jQuery.Event("afterclose." + this.options.domain), this);
    }

    //shown back
    Popup.fn.backShown = function () {
        if (this.options.showback && this.options.showback instanceof Function) {
            this.options.showback.call(this);
        }
        // trigger shown event
        this.$element.triggerHandler(jQuery.Event("shown." + this.options.domain), this);
        this.$source.triggerHandler(jQuery.Event("shown." + this.options.domain), this);
    };

    // Get template
    Popup.fn.addTemplate = function (targetId, json) {
        $("body").append(this.$template = $(this.getTemplate(json)).data("ng.popup", this).attr("id", targetId));
    };

    // Get template
    Popup.fn.getTemplate = function (json) {
        //e.g. json={content:"This is content."}
        return this.setTemplate(json)
    };

    // Set template
    Popup.fn.setTemplate = function (json) {
        var source = this.options.template,
            result = "";

        for (var key in json) {
            var check = this.checkKey(key, source);
            if (check.has) {
                result = source.replace(check.regx, json[key]);
            }
        }

        // if noexit, remove .centerPopup-close anchor tag
        if (this.options.noexit) {
            // remove first anchor tag (.centerPopup-close)
            result = result.replace(/(<a ([^<]+)<\/a>)/, '');
        }

        return result;
    };

    Popup.fn.checkKey = function (key, source) {
        var regx = new RegExp("\\$\\$" + key + "\\$\\$", "ig");

        return {
            regx: regx,
            has: regx.test(source)
        }
    }

    // Get Content
    Popup.fn.getContent = function () {
        return this.getSource().html();
    };

    // Context
    Popup.fn.getContext = function ($obj) {
        $obj = $($obj);

        var ofst = $obj.offset() || {},
            offset = {
                width: $obj.outerWidth() || 0,
                height: $obj.outerHeight() || 0
            },
            scroll = {
                scrollTop: $obj.scrollTop(),
                scrollLeft: $obj.scrollLeft()
            };

        return $.extend({}, offset, ofst, scroll);
    }

    // Set position
    Popup.fn.setPosition = function () {
        var ths = this,
            $element = this.$element,
            $target = $("#" + $element.data("target-id")),
            targetCxt = "",
            placeSwitch = placement = this.options.placement,
            bodyCxt = this.getContext($("body")),
            winCxt = this.getContext($(window)),
            elementCxt = this.getContext($element),
            $content = $(".centerPopup-normal-content", this.$target).removeAttr("style"),
            position = {},
            direction, top, left;

        //set width height
        this.options.width && $content.width(this.options.width - 80);
        this.options.height && $content.height(this.options.height);
        targetCxt = this.getContext($target);

        // detect placement wether is fixed height
        if (/^\d+/.test(placement)) {
            placeSwitch = "fixed";
        }

        switch (placeSwitch) {
            case "center":

                top = (winCxt.height - targetCxt.height) / 2;
                left = (bodyCxt.width - targetCxt.width) / 2 || 0;

                if (top <= 0) {
                    $target.addClass("is-top");
                    top = this.options.spacing + bodyCxt.scrollTop || 0;
                    this.globalState.scroll = false;
                } else {
                    $target.removeClass("is-top");
                    this.globalState.scroll = true;
                }

                break;
            case "follow":
                var followSwitch = followSwitch(winCxt, targetCxt, elementCxt, this.options.spacing);

                $target.hasClass("is-follow") || $target.addClass("is-follow");

                top = followSwitch.top;
                left = followSwitch.left;
                this.options.isarrow = true;
                direction = followSwitch.direct;

                //set arrow
                this.$element.on("shown." + this.options.domain, function () {
                    ths.setArrow.call(ths);
                });

                break;
            case "fixed":
                top = placement + this.options.spacing + bodyCxt.scrollTop || 0;
                left = (bodyCxt.width - targetCxt.width) / 2 || 0;

                $target.addClass("is-top");
                this.globalState.scroll = false;
                break;
            default:

                break;
        }

        position = {
            top: top,
            left: left
        };

        // follow process
        function followSwitch(winCxt, targetCxt, toggleCxt, spacing) {
            var maxWidth = toggleCxt.left + targetCxt.width,
                minWidth = toggleCxt.left + toggleCxt.width,
                maxHeight = toggleCxt.top + toggleCxt.height + targetCxt.height - winCxt.scrollTop || 0,
                minHeight = toggleCxt.top - targetCxt.height - winCxt.scrollTop || 0,
                top, left = toggleCxt.left,
                direct;

            //set left top position
            if (winCxt.width <= maxWidth) {

                if (winCxt.width <= minWidth) {
                    left = minWidth - targetCxt.width;
                } else {
                    left = winCxt.width - targetCxt.width - (spacing || 0);
                }
            } else {
                left = toggleCxt.left;
            }

            if (winCxt.height < maxHeight) {
                direct = "top";
                top = toggleCxt.top - targetCxt.height - (spacing || 0);

                if (minHeight < 0 || winCxt.height < minHeight) {
                    top = toggleCxt.top + toggleCxt.height + (spacing || 0);
                    direct = "bottom";
                }
            } else {
                direct = "bottom"
                top = toggleCxt.top + toggleCxt.height + (spacing || 0);
            }

            return {
                top: top,
                left: left,
                direct: direct
            }

        }

        //flag direction and position
        $target
            .attr("direction", direction)
            .css(position);
    };

    //Set position
    Popup.fn.setArrow = function () {

        if (!this.options.isarrow) {
            return;
        };

        var ths = this,
            $arrow = $(this.options.arrowSelector, this.$target),
            direction = this.$target.attr("direction"),
            arrowCxt = this.getContext($arrow),
            targetCxt = this.getContext(ths.$target),
            toggleCxt = this.getContext(ths.$element),
            limit = {
                top: {
                    min: toggleCxt.top,
                    max: toggleCxt.top + toggleCxt.height
                },
                left: {
                    min: toggleCxt.left + (ths.options.arrowspacing || 0),
                    max: toggleCxt.left + toggleCxt.width - (ths.options.arrowspacing || 0)
                }
            },
            switchDirectSelector = {
                topleft: ths.ClassToString(ths.options.arrowBottomLeftSelector),
                topright: ths.ClassToString(ths.options.arrowBottomRightSelector),
                bottomleft: ths.ClassToString(ths.options.arrowTopLeftSelector),
                bottomright: ths.ClassToString(ths.options.arrowTopRightSelector)
            },
            position = {},
            subDrict;

        if (/top|bottom/ig.test(direction)) {
            //left limit
            subDrict = "left";
            position.left = limit.left.min - targetCxt.left;
            if (arrowCxt.left > limit.left.max) {
                subDrict = "right";
            }
        } else {
            //top limit
            subDrict = "top";
            position.top = limit.top.min - targetCxt.top;
        }

        $arrow
            .removeAttr("class")
            .addClass(ths.ClassToString(ths.options.arrowSelector))
            .addClass(switchDirectSelector[direction + subDrict] || "");

        if (position.left || position.top) {
            $arrow.css(position);
        } else {
            $arrow.removeAttr("style");
        }

    };

    // tool
    Popup.fn.ClassToString = function (class_) {
        return class_.replace(/^\./ig, "");
    };

    // Set effect
    Popup.fn.setEffect = function ($target, json) {
        var effects = this.options.effect,
            target_ctxt = this.getContext($target);

        if (effects) {
            switch (effects) {
                case "expansion":

                    return {
                        start: function () {
                            $target.width(0).height(0);

                            json.before && json.before();

                            $target.animate({
                                width: target_ctxt.width,
                                height: target_ctxt.height
                            }, Popup.TRANSITION_DURATION, function () {
                                json && json.back && json.back();
                                $target.css({
                                    width: "auto",
                                    height: "auto"
                                });
                            });

                        },
                        end: function () {
                            $target.animate({
                                width: 0,
                                height: 0
                            }, Popup.BACKDROP_TRANSITION_DURATION, function () {
                                $target.width("auto").height("auto");
                                json && json.back && json.back();
                            });
                        }
                    }

                    break;
                default:
                    break;
            }
        }
    }
    //Get mask
    Popup.fn.getMask = function () {
        this.$mask = $(this.options.maskSelector);

        if (this.$mask.length === 0) {
            this.createMask();
            this.$mask = $(this.options.maskSelector);
        }

        return this.$mask;
    };

    Popup.fn.createMask = function () {
        var newMask = document.createElement('div'),
            body = document.querySelector('body'),
            id = this.options.maskSelector.replace('#', '');

        newMask.setAttribute("id", id);
        body.insertAdjacentElement('beforeend', newMask);
    };

    // Get Target
    Popup.fn.getTarget = function () {
        var ths = this,
            target_id = this.$element.addClass("is-open").data("target-id")
        $source = this.getSource();

        // Generation popup layer and id
        if (!$source.attr("data-target-id")) {
            if (!target_id) {
                target_id = this.getUID(this.options.type);
                this.addTemplate(target_id, {
                    content: this.getContent()
                });
            }
        } else {
            target_id = $source.attr("data-target-id");

            // fix same source different trigger api
            this.$target = $("#" + target_id).data("ng.popup", this);
        }

        if (!$source.attr("data-target-id")) {
            $source.attr("data-target-id", target_id);
        }

        if (!this.$element.attr("data-target-id")) {
            this.$element.attr("data-target-id", target_id);
        }

        this.$target = $("#" + target_id);

        return this.$target;
    }

    //enter event
    Popup.fn.enter = function () {
        this.show();
    };
    //leave event
    Popup.fn.leave = function () {
        this.hide();
    };

    // Close Popup
    Popup.fn.hide = function () {
        var ths = this,
            $target = $("#" + (this.$element.removeClass("is-open").data("target-id")));
        this.backHidden();
        //hide
        this.getMask().removeAttr("class").hide();

        //If use effect
        if (this.options.effect) {
            this.setEffect(this.$target, {
                back: function () {
                    ths.$target.hide();
                }
            }).end();
        } else {
            this.$target.hide();
        }

        // remove bindings
        this.unbindScrollResize();
        this.backAfterClose();
    };

    // show
    Popup.fn.show = function () {
        var ths = this;

        //gettarget obj
        this.$target = this.getTarget();

        //fix popup is-current
        this.$target.addClass("is-current").siblings(this.options.popupSelector).removeClass("is-current");

        //set obj position
        this.setPosition();

        //Set mask show
        this.setMask();

        //set effect
        if (this.options.effect) {
            this.setEffect(this.$target, {
                before: function () {
                    ths.$target.show();
                },
                back: function () {
                    ths.backShown();
                }
            }).start();
        } else {
            this.$target.show();
            ths.backShown();
        }

        // Bind scroll and resize events
        this.bindScrollResize();

        // Store visible popups for later
        Popup.VISIBLEPOPUPS = $(Popup.SELECTORS.popupSelector + ":visible");

        return false;
    };

    //Set mask
    Popup.fn.setMask = function () {
        var ths = this,
            $mask = this.getMask().show();

        //is use mask
        switch (this.options.mask) {
            case "overshow":
                $mask.removeClass("is-overnone").addClass("is-overshow");
                break;
            case "overnone":
                $mask.removeClass("is-overshow").addClass("is-overnone");
                break;
            case "none":
                $mask.hide();
                break;
        }

        //mask
        !this.options.noexit && $mask
            .one('click', function () {
                $mask.hide();
                ths.hide();
            });
        this.options.noexit && $mask.off('click');
    }

    //Update
    Popup.fn.update = function () {
        this.setPosition();
        this.setArrow();
    };

    // General Popup Id
    Popup.fn.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }

    // Add Script
    Popup.fn.loadScript = function (src) {
        if (src && !$("script[src='" + src + "']").size()) {
            $("head").append("<script src=" + src + "></script>")
        }
    }

    // bind scroll and resize
    Popup.fn.bindScrollResize = function () {
        $(window)
            .on('resize', this.debounce(Handler.resizeUpdate, this.options.timeout))
            .on('scroll', this.debounce(Handler.scrollUpdate, this.options.timeout));
    };

    // unbind scroll and resize
    Popup.fn.unbindScrollResize = function () {
        $(window)
            .off('resize', this.debounce(Handler.resizeUpdate, this.options.timeout))
            .off('scroll', this.debounce(Handler.scrollUpdate, this.options.timeout));
    };

    Popup.fn.debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    // Plugin Definition
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("ng.popup");

            options = typeof option == "object" ? $.extend({}, option, $this.data()) : $this.data();

            if (!data && /destroy|hide/.test(option)) return;

            if (!data) $this.data('ng.popup', (data = new Popup(this, options)));

            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.popup;

    $.fn.popup = Plugin;
    $.fn.popup.Constructor = Popup;

    // POPOVER NO CONFLICT
    // ===================
    $.fn.popup.noConflict = function () {
        $.fn.popup = old
        return this
    }

    // POPOUT DATA-API
    // you can get API from follow
    // Popup.$source.data("ng.popup")
    // Popup.$target.data("ng.popup")
    var Handler = {
        toggle: function () {
            var $this = $(this);

            if (!$this.data("ng.popup")) {
                Plugin.call($(this), "toggle");
            }
        },
        hide: function (e) {
            $(this).closest(Popup.SELECTORS.popupSelector).data(Popup.DEFAULTS.domain).hide();
        },
        scrollUpdate: function () {
            Popup.VISIBLEPOPUPS.each(function () {
                // considering about same soure but different trigger.
                var api = $(this).data(Popup.DEFAULTS.domain);
                api.globalState.scroll && api.update();
            })
        },
        resizeUpdate: function () {
            Popup.VISIBLEPOPUPS.each(function () {
                var api = $(this).data(Popup.DEFAULTS.domain);
                api.globalState.resize && api.update();
            })
        },
        hover: function () {
            $(this).addClass("is-current").siblings(Popup.SELECTORS.popupSelector).removeClass("is-current");
        }
    }

    $(document)
        .on("click.ng.popup", Popup.SELECTORS.toggleSelector, Handler.toggle)
        .on("click.ng.popup", Popup.SELECTORS.closeSelector, Handler.hide)
        .on("mouseenter.ng.popup", Popup.SELECTORS.popupSelector + ":visible", Handler.hover);

}(window, jQuery, document);