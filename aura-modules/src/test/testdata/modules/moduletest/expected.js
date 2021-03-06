$A.componentService.addModule('modules:moduletest', ['x-test'], function (_xTest) { 'use strict';

const memoized = Symbol();
var _tmpl = function ($api, $cmp, $slotset) {
    const m = $cmp[memoized] || ($cmp[memoized] = {});
    return [$api.c(
        "x-test",
        _xTest,
        {
            slotset: {
                $default$: [$api.s($cmp.test)]
            }
        }
    )];
};
const templateUsedIds = ["test"];

class Test {
  render() {
    return _tmpl;
  }

}
Test.tagName = "modules-moduletest";
Test.templateUsedIds = templateUsedIds;

return Test;

});
