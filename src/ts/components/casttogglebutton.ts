import {ToggleButton, ToggleButtonConfig} from "./togglebutton";
import {UIManager} from "../uimanager";

export class CastToggleButton extends ToggleButton<ToggleButtonConfig> {

    constructor(config: ToggleButtonConfig = {}) {
        super(config);

        this.config = this.mergeConfig(config, {
            cssClass: 'ui-casttogglebutton',
            text: 'Google Cast'
        }, this.config);
    }

    configure(player: bitmovin.player.Player, uimanager: UIManager): void {
        let self = this;

        self.onClick.subscribe(function () {
            if (player.isCastAvailable()) {
                if (player.isCasting()) {
                    player.castStop();
                } else {
                    player.castVideo();
                }
            } else {
                console.log("Cast unavailable");
            }
        });

        let castAvailableHander = function () {
            if (player.isCastAvailable()) {
                self.show();
            } else {
                self.hide();
            }
        };

        player.addEventHandler(bitmovin.player.EVENT.ON_CAST_AVAILABLE, castAvailableHander);

        // Hide button if Cast not available
        castAvailableHander();
    }
}