document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
          freelancer = document.getElementById('freelancer'),
          blockCustomer = document.querySelector('#block-customer'),
          blockFreelancer = document.querySelector('#block-freelancer'),
          blockChoice = document.querySelector('#block-choice'),
          btnExit = document.querySelector('#btn-exit'),
          formCustomer = document.querySelector('#form-customer'),
          ordersTable = document.querySelector('#orders'),
          modalOrder = document.querySelector('#order_read'),
          modalOrderActive = document.querySelector('#order_active');

    const orders = [];


    const openModal = (order) => {
        const modal = order.active ? modalOrderActive : modalOrder;
        const titleBlock = document.querySelector('.modal-title'),
              firstNameBlock = document.querySelector('.firstName'),
              emailBlock = document.querySelector('.email'),
              descriptionBlock = document.querySelector('.description'),
              currencyBlock = document.querySelector('.currency_img'),
              countBlock = document.querySelector('.count'),
              phoneBlock = document.querySelector('.phone'),
              deadlineBlock = document.querySelector('.deadline');

        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        currencyBlock.classList.add(order.currency);
        countBlock.textContent = order.amount;
        phoneBlock.textContent = order.phone;
        deadlineBlock.textContent = order.deadline;

        modal.style.display = 'block';
    };

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i + 1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    };


    ordersTable.addEventListener('click', (e) => {
        const target = e.target;
        const targetOrder = target.closest('.order');
        const order = orders[targetOrder.dataset.numberOrder];
        console.log(order);

        if (targetOrder) {
            openModal(order);
        }

    });


    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();

        const elements = [...formCustomer.elements].filter(el => {
            return (el.tagName === 'INPUT' && el.type !== 'radio') ||
                   (el.type === 'radio' && el.checked) ||
                   (el.tagName === 'TEXTAREA')
        });

        const obj = {};
        elements.forEach(el => obj[el.name] = el.value || '');
        orders.push(obj);

        formCustomer.reset();
    });
})