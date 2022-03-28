import { haveText, html, test } from '../utils'

test(
  'one-way binding with string',
  [
    html`
      <div x-data="c1">
        <strong>Parent: </strong>
        <span x-text="foo"></span>
        <div x-data="c2" x-argh:baz="foo">
          <strong>Child: </strong>
          <span id="child" x-text="baz"></span>
        </div>
      </div>
    `,
    `
      Alpine.data('c1', () => ({ foo: 'bar' }))
      Alpine.data('c2', () => ({ baz: '' }))
    `,
  ],
  ({ get }) => {
    get('#child').should(haveText('bar'))
  },
)

test(
  'one-way binding with object',
  [
    html`
      <div x-data="c1">
        <strong>Parent: </strong>
        <span x-text="foo.bar"></span>
        <div x-data="c2" x-argh:baz="foo">
          <strong>Child: </strong>
          <span id="child" x-text="baz.bar"></span>
        </div>
      </div>
    `,
    `
      Alpine.data('c1', () => ({ foo: { bar:'baz' } }))
      Alpine.data('c2', () => ({ baz: {} }))
    `,
  ],
  ({ get }) => {
    get('#child').should(haveText('baz'))
  },
)

test(
  'two-way binding with string',
  [
    html`
      <div x-data="c1">
        <strong>Parent: </strong>
        <span id="parent" x-text="foo"></span>
        <div x-data="c2" x-argh:baz.bind="foo">
          <strong>Child: </strong>
          <span id="child" x-text="baz"></span>
          <button @click="baz = 'bar2'">Change</button>
        </div>
      </div>
    `,
    `
    Alpine.data('c1', () => ({ foo: 'bar' }))
    Alpine.data('c2', () => ({ baz: '' }))
    `,
  ],
  ({ get }) => {
    get('#parent').should(haveText('bar'))
    get('#child').should(haveText('bar'))
    get('button').click()
    get('#parent').should(haveText('bar2'))
    get('#child').should(haveText('bar2'))
  },
)
