$('#trackerForm').submit(function(event) {
    $('#trackItems').empty();
    var formData = {
        'orderId': $('input[name=orderId]').val(),
        'email': $('input[name=email]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    };
    console.log(formData)
    $.ajax({
        type: 'POST',
        url: 'tracker',
        data: formData,
        encode: true
    })
    console.log(data)
        .done(function(data) {
            data = JSON.parse(data);
            updates = data[0]
            if (updates.length > 0 & updates != {}) {
                for (i = 0; i < updates.length; i++) {
                    let text = updates[i]['text'];
                    let time = updates[i]['time'];
                    mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${text}
                    <span class="badge badge-primary badge-pill">${time}</span>
                </li>`
                    $('#trackItems').append(mystr);
                }
            } else {
                mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    Sorry, We are not able to fetch this order id and email. Make sure to type correct order Id and email</li>`
                $('#trackItems').append(mystr);
            };
        });
    event.preventDefault();
});