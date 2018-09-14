import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import Album = Definitions.Album;

@Component({
  selector: 'app-album-group-selector',
  templateUrl: 'album-group-selector.component.html'
})
export class AlbumGroupSelectorComponent implements OnInit {

  @Input()
  albums: Album[];

  @Input()
  groups: string[];

  @Output()
  groupsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  groupName: string;
  selectedGroups: TreeNode[] = [];
  allGroupsTreeNodes: TreeNode[];

  constructor() {}

  addGroup(groupName): void {
    const group = {
      label: groupName,
      expandedIcon: 'fa fa-folder-open',
      collapsedIcon: 'fa fa-folder',
      expanded: true,
      children: []
    };
    this.groupName = undefined;
    this.setGroups(this.selectedGroups.concat(group));
  }

  deleteLastGroup(): void {
    this.selectedGroups.pop();
    this.setGroups(this.selectedGroups);
  }

  setGroups(groups: TreeNode[]): void {
    this.selectedGroups = groups;
    this.groupsChange.emit(this.selectedGroups.map(group => group.label));
  }

  ngOnInit() {
    this.allGroupsTreeNodes = this.createGroupTreeNodes(this.albums);
  }

  selectGroupNode(event): void {
    let selectedNode: TreeNode = event.node;
    const flattenedGroups = [];
    while (selectedNode) {
      flattenedGroups.unshift(selectedNode);
      selectedNode = selectedNode.parent;
    }
    this.setGroups(flattenedGroups);
  }


  private createGroupTreeNodes(albums: Album[]): TreeNode[] {
    return albums.reduce((groups, album) => this.createTreeFromGroupNames(album.tree, groups), []);
  }

  private createTreeFromGroupNames(groupNames: string[], groups: TreeNode[]): TreeNode[] {
    let i = 0;
    let groupName = groupNames[i];
    let children = groups;
    let key = groupName;
    while (groupName) {
      let group = children.find(group => group.label === groupName);
      if (!group) {
        group = {
          label: groupName,
          expandedIcon: 'fa fa-folder-open',
          collapsedIcon: 'fa fa-folder',
          children: []
        };
        children.push(group);
      }
      groupName = groupNames[++i];
      children = group.children;
      key += group.label;
    }
    return groups;
  }
}
