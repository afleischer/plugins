import './style.sass';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const { itemId, itemType, site } = plugin;
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);
  const title = document.createElement('h4');
  title.classList.add('title');
  title.textContent = 'Fields menu';
  container.appendChild(title);
  const domain = site.attributes.internal_domain;

  itemType.relationships.fields.data
    .filter(f => f.id !== plugin.field.id)
    .forEach((relField) => {
      const link = document.createElement('a');
      const field = plugin.fields[relField.id];
      link.textContent = field.attributes.label;
      const anchor = `field--${field.attributes.api_key}${field.attributes.localized ? `.${plugin.locale}` : ''}`;
      const path = `https://${domain}/editor/item_types/${itemType.id}/items/${itemId}/edit#${anchor}`;
      link.href = path;
      link.classList.add('link');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        plugin.scrollTo(anchor);
      });

      container.appendChild(link);
    });
});
