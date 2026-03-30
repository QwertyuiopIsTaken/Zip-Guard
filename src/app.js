let device;
let characteristic;

const SERVICE_UUID = "12345678-1234-1234-1234-123456789abc";
const CHARACTERISTIC_UUID = "abcd1234-5678-1234-5678-abcdef123456";

const statusLbl = document.getElementById("status");
const connectBtn = document.getElementById("bleConnectBtn");

const lockBtn = document.getElementById("lockBtn");
const unlockBtn = document.getElementById("unlockBtn");

connectBtn.addEventListener("click", async () => {
    try {

        statusLbl.textContent = "Status: Connecting...";
        statusLbl.className = "status connecting";

        device = await navigator.bluetooth.requestDevice({
            filters: [{ name: "ZipGuard" }],
            optionalServices: [SERVICE_UUID]
        });

        const server = await device.gatt.connect();

        const service = await server.getPrimaryService(SERVICE_UUID);

        characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

        statusLbl.textContent = "Status: Connected";
        statusLbl.className = "status connected";

        lockBtn.disabled = false;
        unlockBtn.disabled = false;

    } catch (error) {

        console.log(error);

        statusLbl.textContent = "Status: Disconnected";
        statusLbl.className = "status disconnected";

    }
});


lockBtn.addEventListener("click", async () => {
    if (!characteristic) return;

    await characteristic.writeValue(
        new TextEncoder().encode("1")
    );
});


unlockBtn.addEventListener("click", async () => {
    if (!characteristic) return;

    await characteristic.writeValue(
        new TextEncoder().encode("0")
    );
});