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
        const { title, firstName, email, phone, description, amount,
                currency, deadline, active = false } = order;
        const modal = active ? modalOrderActive : modalOrder;

        const titleBlock = modal.querySelector('.modal-title'),
              firstNameBlock = modal.querySelector('.firstName'),
              emailBlock = modal.querySelector('.email'),
              descriptionBlock = modal.querySelector('.description'),
              currencyBlock = modal.querySelector('.currency_img'),
              countBlock = modal.querySelector('.count'),
              phoneBlock = modal.querySelector('.phone'),
              deadlineBlock = modal.querySelector('.deadline');

        titleBlock.textContent = title;
        firstNameBlock.textContent = firstName;
        emailBlock.textContent = email;
        emailBlock.href = 'mailto:' + email;
        descriptionBlock.textContent = description;
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency);
        countBlock.textContent = amount;
        deadlineBlock.textContent = deadline;
        if (phoneBlock) phoneBlock.href = 'tel:' + phone;

        modal.style.display = 'flex';

        const closeBtn = modal.querySelector('.close');
        closeBtn ? closeBtn.addEventListener('click', (e) => {
            modal.style.display = 'none';
        }) : '';

        const getOrderBtn = modal.querySelector('.get-order');
        getOrderBtn ? getOrderBtn.addEventListener('click', () => {
            order.active = true;
            modal.style.display = 'none';
            renderOrders();
        }) : '';

        const capitulationBtn = modal.querySelector('#capitulation');
        capitulationBtn ? capitulationBtn.addEventListener('click', () => {
            order.active = false;
            modal.style.display = 'none';
            renderOrders();
        }) : '';
    };

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order ${ order.active ? 'taken' : '' }"
                    data-number-order="${i}">
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