$(function() {

  

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Hours to the Brotherhood",
            value: 12
        }, {
            label: "Hours to the Campus",
            value: 30
        }, {
            label: "Hours to the Community",
            value: 20
        },{
            label: "Hours to the Nation & World",
            value: 20
        }],
        resize: true
    });

    
});
