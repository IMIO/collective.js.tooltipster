function tooltipster_helper(selector,
                            view_name,
                            data_parameters=[],
                            options={}) {

    jQuery(function($){

    $(selector).tooltipster({
        zIndex: options.zIndex || 9999999,
        content: "...",
        contentAsHTML: true,
        interactive: true,
        theme: options.theme || 'tooltipster-shadow',
        position: options.position || 'bottom',
        animationDuration: options.animationDuration || 100,
        delay: options.delay || 50,
        animation: options.animation || 'fade',
        updateAnimation: options.updateAnimation || 'fade',
        trigger: options.trigger || 'hover',
        triggerOpen: options.triggerOpen || {},
        triggerClose: options.triggerClose || {},

        functionBefore: function (instance, helper) {
            var $origin = $(helper.origin);
            if ($origin.data('loaded') !== true) {
                // data_parameters
                parameters = {};
                for (i = 0, len = data_parameters.length; i < len; i++) {
                    value = $($origin).attr('data-'+ data_parameters[i]);
                    parameters[data_parameters[i]] = value;
                }
                // base_url
                var base_url = $($origin).attr('data-base_url');
                if (!base_url) {
                  base_url = document.baseURI;
                }
                parameters.ajax_load = new Date().getTime();

                $.ajax({
                    type: 'GET',
                    url: base_url + '/' + view_name,
                    data: parameters,
                    success: function (data) {
                        instance.content(data);
                        $origin.data('loaded', true);
                    }
                });

        }
        close_other_tips = options.close_other_tips || null;
        if (close_other_tips === true) {
            $('.tooltipstered').tooltipster('close');
        }
    },
    functionReady: function (instance, helper) {
        functionReady_callback = options.functionReady_callback || null;
        if (functionReady_callback != null) {
            functionReady_callback();
        }
    }

});
});
  
}