"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function getTutureTutorialsInfo(info, profile) {
    console.log(info.length);
    console.log(profile);
    return info;
}
var getTutureTutorialsInfo1 = function (info) {
    console.log(info.length);
    return info;
};
getTutureTutorialsInfo(['hello tuture'], { username: 'tuture' });
getTutureTutorialsInfo1(['test']);
var Profile = /** @class */ (function () {
    function Profile() {
    }
    return Profile;
}());
var TutureProfile = /** @class */ (function (_super) {
    __extends(TutureProfile, _super);
    function TutureProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TutureProfile;
}(Profile));
function createInstance(B) {
    return new B();
}
var myTutureProfile = createInstance(TutureProfile);
