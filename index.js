function count(s, target) {
    let n = 0;

    for (const ch of s) {
        if (ch != target) break;
        n += 1;
    }

    return n;
}

function checkIpAddress(ip_octets) {
    return ip_octets.length == 4 && ip_octets.map((octet) => octet >= 0 && octet <= 255);
}

function inputIpAndSubnetmask() {
    const ip_address = document.getElementById("ip").value;
    const snm = document.getElementById("snm").value;
    const ip_octets = ip_address.split(".");
    const snm_octets = snm.split(".");

    if (!(checkIpAddress(ip_octets) && checkIpAddress(snm_octets))) return;

    clearInput();
    processInput(ip_octets, snm_octets);
}

function ipToBinary(ip_octets) {
    return ip_octets.map((octet) => {
        let bin = Number(octet).toString(2);
        const bin_length = bin.length;
        for (let i = 1; i <= 8 - bin_length; i++) {
            bin = '0' + bin;
        }
        return bin;
    });
}

function processInput(ip, snm) {
    const snm_binary = ipToBinary(snm);
    const prefix = count(snm_binary.join(""), "1");
    const subnet_count = 2 ** count(snm_binary[snm_binary.length - 1], "1");
    const host_count = 2 ** (32 - prefix);
    const usable_host_count = host_count - 2;

    document.getElementById("ip_address").textContent = ip.join(".");
    document.getElementById("subnetmask").textContent = snm.join(".");
    document.getElementById("ip_address_binary").textContent = ipToBinary(ip).join(".");
    document.getElementById("subnetmask_binary").textContent = ipToBinary(snm).join(".");
    document.getElementById("prefix").textContent = prefix;
    document.getElementById("subnet_count").textContent = subnet_count;
    document.getElementById("host_count").textContent = host_count;
    document.getElementById("usable_host_count").textContent = usable_host_count;
}
