(() => {
  function fetchCommands() {
    return new Promise((resolve, reject) => {
      //fetch('http://coffeechop.herokuapp.com/commands')
      fetch('https://coffeechop.herokuapp.com/commands')
        .then(res => {
          if (res.status === 200) res.json().then(resolve);
          if (res.status === 500) res.json().then(reject);
        })
        .catch(err => reject({ message: 'Failed to reach address.' }));
    });
  }

  function makeRow(cmd) {
    return `<tr>
      <th scope="row" class="align-middle">${cmd.name}</th>
      <td>${cmd.description}</td>
      <td class="align-middle"><strong>${cmd.category}</strong></td>
      <td class="d-none d-sm-table-cell align-middle">${cmd.args.join(' ')}</td>
    </tr>
    `;
  }

  const $list = document.querySelector('#command-list');
  const $loading = document.querySelector('.loading');

  function loadCommands() {
    fetchCommands()
      .then(data => {
        $loading.className = 'd-none';
        data.commands.forEach(cmd => {
          $list.innerHTML += makeRow(cmd);
        });
        $list.parentElement.parentElement.innerHTML += `<div class="flex-center w-100 chop-version"><span class="badge badge-success">Chop@${data.version}</span></div>`;
      })
      .catch(err => {
        $loading.innerHTML = `<div class="alert alert-danger" role="alert">
        <h5 class="alert-heading">Oh No!</h5>
        <p>The command list could not be retrieved. Please try again later or use the <strong>chop help</strong> command in discord.</p>
        <hr>
        <p>error_msg: ${err.message}</p>
      </div>
      <div class="flex-center w-100 chop-version">
      <button class="btn btn-sm btn-info" onclick="chopCommands.retry()">Retry</button>
      </div>`;
        $loading.className = '';
      });
  }

  function retry() {
    $loading.className = 'loading';
    $loading.innerHTML = '';
    const $badge = document.querySelector('.chop-version');
    $badge ? $badge.remove() : null;
    loadCommands();
  }

  window.chopCommands = {
    loadCommands,
    retry,
  };
})();

window.chopCommands.loadCommands();
