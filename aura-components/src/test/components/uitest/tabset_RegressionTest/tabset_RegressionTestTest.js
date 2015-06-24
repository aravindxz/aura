/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
    SELECTOR: {
        tabsetcmp : 'tabSet',
        tabitem: '.tabItem.uiTabItem',
        tabbody: '.tabBody.uiTab.active',
        tabbody_active: '.tabBody.uiTab.active'
    },

    owner: 'sle',

    /**
     * adding dynamic tab
     */
    testAddTab: {
        attributes: {
            "renderItem": "testAddTab"
        },
        test: [
            function(cmp) {
                var self = this,
                tabSet = cmp.find(self.SELECTOR.tabsetcmp),
                    i;

                //attempt to add 2 tab 
                for (i = 0; i < 2; i++) {
                    self.addDynamicTab(
                        tabSet,
                        "tab" + i,//tab title
                        "tab content " + i,//tab content
                        "tab" + i//tab name
                    );
                }

                //assertion tab items
                $A.test.addWaitForWithFailureMessage(
                    2,
                    function(){
                        return $A.test.select(self.SELECTOR.tabitem).length;
                    },
                    'Tab items count should be 2 (after adding 2 tabs)'
                );
            },
            function(cmp){
                //activate a tab
                var self = this,
                tabSet = cmp.find(self.SELECTOR.tabsetcmp);

                self.selectedTabByIndex(tabSet, 0);
                self.verifySelectedTabContent('tab content 0');
            }
        ]
    },



    //helper
    /**
     * @param  expected active tab body
     * @return none but verify active tab body
     */
    verifySelectedTabContent: function(expectedActiveTabBody){
        //assertion selected tab body
        var self = this;

        $A.test.addWaitForWithFailureMessage(
            1,
            function(){
                return $A.test.select(self.SELECTOR.tabbody_active).length;
            },
            'should only have 1 selected tab',
            function(){
                //assert active tab body text
                $A.test.assertEqualsIgnoreWhitespace(
                    expectedActiveTabBody,
                    $A.util.trim(
                        $A.test.getText(
                            $A.test.select(self.SELECTOR.tabbody_active)[0]
                        )
                    ),
                    'Selected tab content should be "' + expectedActiveTabBody + '"'
                )
            }
        );
    },
    //selected tab by index
    /**
     * @param  tabset component reference
     * @param  index of tab to be selected
     * @return none, but select the tab
     */
    selectedTabByIndex: function(tabSet, idx){
        var e = tabSet.get("e.activateTab");
        e.setParams({
            index : idx
        });
        e.fire();
    },
    /**
     * @param  tabset component reference
     * @param  tab title
     * @param  tab body
     * @param  tab name
     */
    addDynamicTab: function(tabSet, tabTitle, tabBody, tabName){
        var e = tabSet.get("e.addTab");
        e.setParams({
            tab: {
                "title": tabTitle,
                "name": tabName || tabTitle,
                "body": [{
                    "componentDef": {
                        descriptor: "markup://aura:text"
                    },
                    "attributes": {
                        "values": {
                            "value": tabBody
                        }
                    }
                }]
            }
        });
        e.fire();
    }
});