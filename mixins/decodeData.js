import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
export default {
  methods: {
    decodeData(data) {
      return documentToHtmlString(data);
    }
  },
}
