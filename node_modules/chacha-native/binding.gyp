{
  "targets": [
    {
      "target_name": "chacha20poly1305",
      "sources": [
        "src/chacha20poly1305.cc",
        "src/chacha20_simple.cc",
        "src/chacha.cc",
        "src/poly.cc",
        "src/poly1305-donna.cc",
        "src/aead.cc",
        "src/legacy.cc"
        ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
