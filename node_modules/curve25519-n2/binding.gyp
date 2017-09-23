{
  "targets": [
    {
      "target_name": "curve",
      "sources": [ "node_curve.cc" ],
      'include_dirs': [
      	"<!(node -e \"require('nan')\")"
      ]
     }
    ]
}
